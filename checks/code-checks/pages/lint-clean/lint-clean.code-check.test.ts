import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, realpathSync, symlinkSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { rootOf } from "@akasha/command-system/rooting"
import { scratchWorld } from "@akasha/command-system/scratching"
import type { Change } from "@akasha/pages/change"
import { shadowAsked } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change, gone, proposing } from "../../../modules/scratch/check-scratch.module.code.ts"
import {
  carriedIn,
  judgedOf,
  lintClean,
  lookedAt,
  outsideOf,
  readsIn,
  reasonOf,
} from "./lint-clean.code-check.code.ts"

const READS: readonly string[] = [".ts", ".tsx", ".css"]

const said = (text: string) => new TextEncoder().encode(text)

const REPO_AT = rootOf(import.meta.dir)

const MODULES = "node_modules"

const CONFIG = "biome.json"

const SETTINGS =
  '{"files":{"includes":["**/*.ts","**/*.tsx","**/*.css"]},' +
  '"formatter":{"enabled":false},"assist":{"enabled":false},"linter":{"rules":' +
  '{"recommended":false,"correctness":{"noUnusedVariables":"error"}}}}\n'

const CLEAN = "export function held(): number {\n  return 1\n}\n"

const UNUSED = "export function held(): number {\n  const spare = 2\n  return 1\n}\n"

const RULE = "lint/correctness/noUnusedVariables"

const STYLED = ".readout-ring {\n  color: red;\n}\n"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function linted(held: Change): readonly Judged[] {
  return lintClean(held, shadowAsked(held))
}

function repo(files: Record<string, string>, linter = true): string {
  const root = realpathSync(scratch.rootFor("lint-clean-"))
  writeFileSync(join(root, CONFIG), SETTINGS)
  if (linter) symlinkSync(join(REPO_AT, MODULES), join(root, MODULES))
  for (const [name, body] of Object.entries(files)) {
    const at = join(root, name)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
  }
  return root
}

test("the files judged are the ones the linter reads, said once and in order", () => {
  const root = repo({
    "akasha/two.ts": CLEAN,
    "akasha/one.ts": CLEAN,
    "akasha/held.tsx": CLEAN,
    "akasha/held.css": STYLED,
    "akasha/held.md": "held",
  })
  const changed = [
    "akasha/two.ts",
    "akasha/one.ts",
    "akasha/two.ts",
    "akasha/held.tsx",
    "akasha/held.css",
    "akasha/held.md",
  ]
  expect(carriedIn(change(root, changed), READS)).toEqual([
    "akasha/held.css",
    "akasha/held.tsx",
    "akasha/one.ts",
    "akasha/two.ts",
  ])
})

test("a stylesheet and a body written with JSX are both read, and a note is not", () => {
  expect(lookedAt("akasha/one.css", READS)).toBe(true)
  expect(lookedAt("akasha/one.tsx", READS)).toBe(true)
  expect(lookedAt("akasha/one.ts", READS)).toBe(true)
  expect(lookedAt("akasha/one.md", READS)).toBe(false)
})

test("the names the configuration reads are the names the check reads", () => {
  expect(readsIn(said('{"files":{"includes":["**/*.ts","**/*.js","!**/node_modules"]}}'))).toEqual([
    ".ts",
    ".js",
  ])
})

test("a configuration narrowing by no name leaves every changed file read", () => {
  expect(readsIn(said('{"linter":{"enabled":true}}'))).toBe(null)
  expect(lookedAt("akasha/one.js", null)).toBe(true)
})

test("a configuration that will not parse narrows nothing rather than throwing", () => {
  expect(readsIn(said("{not json"))).toBe(null)
  expect(readsIn(null)).toBe(null)
})

test("a file the change takes away is judged by nothing", () => {
  const root = repo({ "akasha/one.ts": CLEAN })
  expect(carriedIn(change(root, ["akasha/one.ts"], gone), READS)).toEqual([])
})

test("a change carrying no file the linter reads is judged by no run", () => {
  const root = repo({ "akasha/held.md": "held" })
  expect(linted(change(root, ["akasha/held.md"]))).toEqual([])
})

test("a change the linter finds nothing in is not refused", () => {
  const root = repo({ "akasha/one.ts": CLEAN })
  expect(linted(change(root, ["akasha/one.ts"]))).toEqual([])
})

test("a change the linter finds fault in is refused, and the reason names the rule", () => {
  const root = repo({ "akasha/one.ts": UNUSED })
  const judged = linted(change(root, ["akasha/one.ts"]))
  expect(judged.length).toBe(1)
  expect(judged[0]?.path).toBe("akasha/one.ts")
  expect(judged[0]?.reason).toContain(RULE)
  expect(judged[0]?.reason).toContain("This variable spare is unused.")
})

test("every finding is answered, each against the file it is in", () => {
  const root = repo({ "akasha/one.ts": UNUSED, "akasha/two.ts": UNUSED })
  const judged = linted(change(root, ["akasha/one.ts", "akasha/two.ts"]))
  expect(judged.map((one) => one.path)).toEqual(["akasha/one.ts", "akasha/two.ts"])
})

test("a change is judged by the body it proposes, not the one on disk", () => {
  const root = repo({ "akasha/one.ts": CLEAN })
  const at = proposing(root, "akasha/one.ts", UNUSED)
  const judged = linted(change(root, ["akasha/one.ts"], at))
  expect(judged.length).toBe(1)
  expect(judged[0]?.reason).toContain(RULE)
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe(CLEAN)
  expect(linted(change(root, ["akasha/one.ts"]))).toEqual([])
})

test("a change taking a fault away passes, though the fault is still on disk", () => {
  const root = repo({ "akasha/one.ts": UNUSED })
  const at = proposing(root, "akasha/one.ts", CLEAN)
  expect(linted(change(root, ["akasha/one.ts"], at))).toEqual([])
})

test("a linter that could not run is a refusal, not a pass", () => {
  const root = repo({ "akasha/one.ts": CLEAN }, false)
  const judged = linted(change(root, ["akasha/one.ts"]))
  expect(judged.length).toBe(1)
  expect(judged[0]?.path).toBe("akasha/one.ts")
  expect(judged[0]?.reason).toContain("nothing was looked at")
  expect(judged[0]?.reason).toContain("verified nothing")
})

test("the reason names the tree that stays rather than the one that is swept", () => {
  const root = repo({ "akasha/one.ts": CLEAN }, false)
  const judged = linted(change(root, ["akasha/one.ts"]))
  expect(judged[0]?.reason).not.toContain("/var/tmp/akasha-mirror-")
  expect(judged[0]?.reason).toContain(root)
})

test("the mirror's root is taken out of what is reported", () => {
  expect(outsideOf("held at /held/one.ts, under /held", "/held")).toBe(
    "held at one.ts, under the mirror this change was written into"
  )
})

test("a finding is said as its rule, where it is and what the linter said", () => {
  const found = { path: "akasha/one.ts", line: 12, column: 7, rule: RULE, said: "This is unused." }
  expect(reasonOf(found)).toBe(`\`${RULE}\` at line 12, column 7 — This is unused.`)
})

test("a run that failed is answered against the first file named", () => {
  const looked = { code: -1, errors: 0, found: [], failed: "nothing is under /held" }
  const judged = judgedOf(looked, "akasha/one.ts", "/held")
  expect(judged.length).toBe(1)
  expect(judged[0]?.path).toBe("akasha/one.ts")
  expect(judged[0]?.reason).toBe(
    "nothing is under the mirror this change was written into. A linter that could not look has verified nothing, so this change is not judged."
  )
})
