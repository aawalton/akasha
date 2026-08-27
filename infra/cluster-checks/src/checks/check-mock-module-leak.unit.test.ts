import { execFileSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { createEngine } from "../../../../../instructions/tools/lib/graph/engine.ts"
import { fileNodeProducer } from "../../../../../instructions/tools/lib/graph/producers/file/file.node.producer.ts"
import { tsFileEdgeProducer } from "../../../../../instructions/tools/lib/graph/producers/file/ts-file/ts-file.edge.producer.ts"
import { CODE_REPO } from "../../../../../instructions/tools/lib/graph/producers/lib/constants.ts"
import { packageNodeProducer } from "../../../../../instructions/tools/lib/graph/producers/package/package.node.producer.ts"
import {
  applyRegistrars,
  PRODUCERS_DIR,
  registrarPaths,
} from "../../../../../instructions/tools/lib/graph/snapshot.ts"
import { buildMockLeakContext } from "../lib/mock-module-leak-context.ts"
import {
  findMockModuleLeakViolations,
  type MockModuleLeakFinding,
} from "./check-mock-module-leak.ts"

const SCRATCH = "/var/tmp"

const TSCONFIG = `{ "compilerOptions": { "module": "esnext", "moduleResolution": "bundler" } }\n`

const FIXTURE: Readonly<Record<string, string>> = {
  "package.json": `{ "name": "@fixture/root", "workspaces": ["pkg-leak", "pkg-quiet"] }\n`,

  "pkg-leak/package.json": `{ "name": "@fixture/pkg-leak" }\n`,
  "pkg-leak/tsconfig.json": TSCONFIG,
  "pkg-leak/src/service.ts": `export const foo = (): string => "real"\n`,
  "pkg-leak/src/stub.unit.test.ts": `import { mock, test } from "bun:test"
import { foo } from "./service"

mock.module("./service", () => ({ foo: () => "stub" }))

test("stubs foo for itself", () => {
  foo()
})
`,
  "pkg-leak/src/consumer.unit.test.ts": `import { test } from "bun:test"
import { foo } from "./service"

test("wants the real foo, and gets the stub instead", () => {
  foo()
})
`,

  "pkg-quiet/package.json": `{ "name": "@fixture/pkg-quiet" }\n`,
  "pkg-quiet/tsconfig.json": TSCONFIG,
  "pkg-quiet/src/service.ts": `export const bar = (): string => "real"\n`,
  "pkg-quiet/src/stub.unit.test.ts": `import { mock, test } from "bun:test"
import { bar } from "./service"

mock.module("./service", () => ({ bar: () => "stub" }))

test("stubs bar, which no sibling imports", () => {
  bar()
})
`,
}

let root = ""
let findings: readonly MockModuleLeakFinding[] = []

const forFile = (rel: string): readonly MockModuleLeakFinding[] =>
  findings.filter((one) => one.file === rel)

beforeAll(async () => {
  root = mkdtempSync(join(SCRATCH, "mock-module-leak-fixture-"))
  const git = (...args: readonly string[]): string =>
    execFileSync("git", ["-C", root, ...args], { encoding: "utf-8" }).trim()
  git("init", "-q")
  git("config", "user.email", "fixture@example.invalid")
  git("config", "user.name", "fixture")
  for (const [rel, body] of Object.entries(FIXTURE)) {
    mkdirSync(dirname(join(root, rel)), { recursive: true })
    writeFileSync(join(root, rel), body)
  }
  git("add", "-A")
  git("commit", "-q", "-m", "fixture")

  const engine = createEngine()
  await applyRegistrars(engine, registrarPaths(PRODUCERS_DIR))
  engine.registerProducer(packageNodeProducer)
  engine.registerProducer(fileNodeProducer)
  engine.registerProducer(tsFileEdgeProducer)
  const graph = await engine.build({
    repoRoots: new Map([[CODE_REPO, root]]),
    repoFiles: new Map([[CODE_REPO, Object.keys(FIXTURE)]]),
    commit: git("rev-parse", "HEAD"),
  })
  findings = findMockModuleLeakViolations(buildMockLeakContext(graph))
})

afterAll(() => {
  if (root !== "") rmSync(root, { recursive: true, force: true })
})

describe("findMockModuleLeakViolations against a planted fixture", () => {
  test("the fixture graph reached the rule at all", () => {
    expect(root).not.toBe("")
    expect(findings.length).toBeGreaterThan(0)
  })

  test("a stub a sibling test runtime-imports is reported, naming the export and the sibling", () => {
    const found = forFile("pkg-leak/src/stub.unit.test.ts")
    expect(found).toHaveLength(1)
    const one = found[0]
    expect(one).toBeDefined()
    if (one === undefined) return
    expect(one.specifier).toBe("./service")
    expect([...one.stubbedExports]).toEqual(["foo"])
    expect([...one.consumers]).toEqual(["pkg-leak/src/consumer.unit.test.ts"])
  })

  test("a stub no sibling imports is left alone", () => {
    expect(forFile("pkg-quiet/src/stub.unit.test.ts")).toEqual([])
  })
})
