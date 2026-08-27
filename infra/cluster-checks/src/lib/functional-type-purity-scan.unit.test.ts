import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

import { passesPurityScan } from "./functional-type-discriminators.ts"

describe("passesPurityScan", () => {
  let tmp: string

  beforeEach(() => {
    tmp = mkdtempSync(join(tmpdir(), "purity-scan-"))
  })

  afterEach(() => {
    rmSync(tmp, { recursive: true, force: true })
  })

  function writeFile(relPath: string, body: string): undefined {
    const full = join(tmp, relPath)
    mkdirSync(join(full, ".."), { recursive: true })
    writeFileSync(full, body, "utf-8")
  }

  test("empty workspace → passes", () => {
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("clean lib/foo.ts (no I/O) → passes", () => {
    writeFile("lib/foo.ts", "export const x = 1\n")
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("lib/foo.ts with Bun.spawn → fails", () => {
    writeFile("lib/foo.ts", `export const run = () => Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(false)
  })

  test("bin/cli.ts importing node:fs → fails", () => {
    writeFile(
      "bin/cli.ts",
      `import { readFileSync } from "node:fs"\nexport const x = readFileSync\n`
    )
    expect(passesPurityScan(tmp)).toBe(false)
  })

  test("scripts/run.ts with top-level fetch( → fails", () => {
    writeFile("scripts/run.ts", `export const r = await fetch("https://x")\n`)
    expect(passesPurityScan(tmp)).toBe(false)
  })

  test("global `fetch` handed in as a default → fails: the default is what runs", () => {
    writeFile(
      "src/read.ts",
      `export const read = (url: string, f: typeof fetch = fetch) => f(url)\n`
    )
    expect(passesPurityScan(tmp)).toBe(false)
  })

  test("`fetch` as a property of something else is not the global → passes", () => {
    writeFile(
      "src/client.ts",
      `export const read = (c: {fetch(u: string): unknown}) => c.fetch("x")\n`
    )
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("process.kill( → fails: signalling another process is not a calculation", () => {
    writeFile("src/probe.ts", `export const p = (pid: number) => process.kill(pid, 0)\n`)
    expect(passesPurityScan(tmp)).toBe(false)
  })

  test("process.env stays tolerated — it reads config, it does not signal", () => {
    writeFile("src/conf.ts", `export const home = process.env.HOME ?? ""\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("`kill` on something that is not `process` is not the syscall", () => {
    writeFile(
      "src/x.ts",
      `export const f = (p: {kill(a: number, b: number): void}) => p.kill(1, 0)\n`
    )
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("nested deeply/lib/foo.ts importing bare 'fs' → fails", () => {
    writeFile(
      "deeply/nested/lib/foo.ts",
      `import { readFileSync } from "fs"\nexport const x = readFileSync\n`
    )
    expect(passesPurityScan(tmp)).toBe(false)
  })

  test("src/foo.test.ts with Bun.spawn → passes (test suffix excluded)", () => {
    writeFile("src/foo.test.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("src/foo.test.tsx with Bun.spawn → passes (test suffix excluded)", () => {
    writeFile("src/foo.test.tsx", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("src/foo.spec.ts with Bun.spawn → passes (spec suffix excluded)", () => {
    writeFile("src/foo.spec.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("lib/foo.spec.tsx with Bun.spawn → passes (spec suffix excluded)", () => {
    writeFile("lib/foo.spec.tsx", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("dist/legacy.ts with Bun.spawn → passes (dist excluded)", () => {
    writeFile("dist/legacy.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("build/legacy.ts with Bun.spawn → passes (build excluded)", () => {
    writeFile("build/legacy.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("out/legacy.ts with Bun.spawn → passes (out excluded)", () => {
    writeFile("out/legacy.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("generated/x.ts with Bun.spawn → passes (generated excluded)", () => {
    writeFile("generated/x.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("src/generated/x.ts with Bun.spawn → passes (generated excluded at any depth)", () => {
    writeFile("src/generated/x.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("coverage/x.ts with Bun.spawn → passes (coverage excluded)", () => {
    writeFile("coverage/x.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test(".next/x.ts with Bun.spawn → passes (.next excluded as dotdir)", () => {
    writeFile(".next/x.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test(".turbo/x.ts with Bun.spawn → passes (.turbo excluded as dotdir)", () => {
    writeFile(".turbo/x.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("any dotdir excluded — .myown/x.ts with Bun.spawn → passes", () => {
    writeFile(".myown/x.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("test/foo.ts with Bun.spawn → passes (test/ excluded)", () => {
    writeFile("test/foo.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("tests/foo.ts with Bun.spawn → passes (tests/ excluded)", () => {
    writeFile("tests/foo.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("__tests__/foo.ts with Bun.spawn → passes (__tests__/ excluded)", () => {
    writeFile("__tests__/foo.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("k8s/synth.ts with Bun.spawn → passes (k8s excluded — service/worker rows)", () => {
    writeFile("k8s/synth.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("deploy/k8s/synth.ts with Bun.spawn → passes (k8s excluded at any depth)", () => {
    writeFile("deploy/k8s/synth.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("node_modules/foo.ts with Bun.spawn → passes (node_modules excluded)", () => {
    writeFile("node_modules/foo.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("src/foo.ts with Bun.spawn → fails (was already covered)", () => {
    writeFile("src/foo.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(false)
  })

  test("app/foo.ts with Bun.spawn → fails (was already covered)", () => {
    writeFile("app/foo.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(false)
  })

  test("workspace-root foo.ts with Bun.spawn → fails (was already covered)", () => {
    writeFile("foo.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(false)
  })

  test(".d.ts files excluded by suffix even with I/O-shaped tokens", () => {
    writeFile("lib/foo.d.ts", `declare const x: typeof Bun.spawn\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("scripts/foo.script.ts with Bun.spawn → passes (script suffix excluded)", () => {
    writeFile("scripts/foo.script.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("scripts/foo.script.tsx with Bun.spawn → passes (script suffix excluded)", () => {
    writeFile("scripts/foo.script.tsx", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("scripts/generate-codegen.script.ts importing node:fs → passes", () => {
    writeFile(
      "scripts/generate-codegen.script.ts",
      `import { writeFileSync } from "node:fs"\nexport const x = writeFileSync\n`
    )
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("src/foo.script.ts with Bun.spawn → passes (script suffix excluded at any depth)", () => {
    writeFile("src/foo.script.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("scripts/foo.ts (no .script suffix) with Bun.spawn → fails", () => {
    writeFile("scripts/foo.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(false)
  })

  test("nested workspace at cli/ with Bun.spawn → passes (boundary respected)", () => {
    writeFile("cli/package.json", `{"name":"@scope/inner","version":"0.0.0","private":true}\n`)
    writeFile("cli/src/index.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("nested workspace at ui/ with node:fs → passes (boundary respected)", () => {
    writeFile("ui/package.json", `{"name":"@scope/inner","version":"0.0.0","private":true}\n`)
    writeFile(
      "ui/src/index.ts",
      `import { readFileSync } from "node:fs"\nexport const x = readFileSync\n`
    )
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("deeply nested workspace at addon/sub/ → passes (boundary respected)", () => {
    writeFile(
      "addon/sub/package.json",
      `{"name":"@scope/inner","version":"0.0.0","private":true}\n`
    )
    writeFile("addon/sub/lib/foo.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(true)
  })

  test("parent's own lib/ is still walked even when nested workspace exists at cli/", () => {
    writeFile("cli/package.json", `{"name":"@scope/inner","version":"0.0.0","private":true}\n`)
    writeFile("cli/src/index.ts", `Bun.spawn(["echo"])\n`)
    writeFile("lib/foo.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(false)
  })

  test("workspace root's own package.json does not stop the walk", () => {
    writeFile("package.json", `{"name":"@scope/root","version":"0.0.0","private":true}\n`)
    writeFile("src/foo.ts", `Bun.spawn(["echo"])\n`)
    expect(passesPurityScan(tmp)).toBe(false)
  })
})
