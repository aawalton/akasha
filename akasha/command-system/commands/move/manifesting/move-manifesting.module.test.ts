import { expect, test } from "bun:test"
import type { Manifesting } from "./move-manifesting.module.code.ts"
import { manifestingOver, manifestsOver, repointedIn } from "./move-manifesting.module.code.ts"

const FOLDER = "akasha/held"

const AT = "akasha/held/package.json"

const WAS = "akasha/held/one/one.module.code.ts"

const NOW = "akasha/held/deep/one/one.module.code.ts"

const HELD: Manifesting = { at: AT, folder: FOLDER, arriving: FOLDER }

function moving(...pairs: readonly (readonly [string, string])[]): ReadonlyMap<string, string> {
  return new Map(pairs)
}

function manifest(exports: unknown): string {
  return `${JSON.stringify({ name: "@akasha/held", private: true, exports }, null, 2)}\n`
}

const EXPORTS = { "./one": "./one/one.module.code.ts" }

test("the manifest above what moved is the one looked at", () => {
  expect(manifestsOver(moving([WAS, NOW]), (path) => path === AT)).toEqual([HELD])
})

test("a file under nested packages is answered for by every manifest above it", () => {
  const held = [AT, "akasha/held/one/package.json"]
  expect(
    manifestsOver(moving([WAS, NOW]), (path) => held.includes(path)).map((one) => one.at)
  ).toEqual([...held].sort())
})

test("the walk up stops at the akasha folder", () => {
  const said = manifestsOver(moving([WAS, NOW]), () => true).map((one) => one.at)
  expect(said).not.toContain("package.json")
})

test("a manifest that moves says the folder that manifest arrives in", () => {
  const there = (path: string): boolean => path === AT
  const said = manifestsOver(moving([WAS, NOW], [AT, "akasha/other/package.json"]), there)
  expect(said).toEqual([{ at: AT, folder: FOLDER, arriving: "akasha/other" }])
})

test("a way in whose file moved is repointed to where it arrived", () => {
  const said = repointedIn(HELD, manifest(EXPORTS), moving([WAS, NOW]))
  expect(said).not.toBeNull()
  expect(JSON.parse(said ?? "").exports).toEqual({ "./one": "./deep/one/one.module.code.ts" })
})

test("what a manifest says besides its ways in is kept as it is", () => {
  const said = repointedIn(HELD, manifest(EXPORTS), moving([WAS, NOW]))
  const held = JSON.parse(said ?? "")
  expect(held.name).toBe("@akasha/held")
  expect(held.private).toBe(true)
})

test("a way in whose file did not move is left alone", () => {
  expect(
    repointedIn(HELD, manifest(EXPORTS), moving(["akasha/other/x.ts", "akasha/o/x.ts"]))
  ).toBeNull()
})

test("a way in beside one that moved keeps what it says", () => {
  const said = repointedIn(
    HELD,
    manifest({ "./one": "./one/one.module.code.ts", "./two": "./two/two.module.code.ts" }),
    moving([WAS, NOW])
  )
  expect(JSON.parse(said ?? "").exports).toEqual({
    "./one": "./deep/one/one.module.code.ts",
    "./two": "./two/two.module.code.ts",
  })
})

test("a way in whose file leaves the package is taken out", () => {
  const said = repointedIn(
    HELD,
    manifest({ "./one": "./one/one.module.code.ts", "./two": "./two/two.module.code.ts" }),
    moving([WAS, "akasha/other/one.module.code.ts"])
  )
  expect(JSON.parse(said ?? "").exports).toEqual({ "./two": "./two/two.module.code.ts" })
})

test("a manifest stating one string for its exports is repointed as one", () => {
  const said = repointedIn(HELD, manifest("./one/one.module.code.ts"), moving([WAS, NOW]))
  expect(JSON.parse(said ?? "").exports).toBe("./deep/one/one.module.code.ts")
})

test("one string for the exports whose file leaves the package is taken out", () => {
  const said = repointedIn(
    HELD,
    manifest("./one/one.module.code.ts"),
    moving([WAS, "akasha/other/one.module.code.ts"])
  )
  expect(JSON.parse(said ?? "")).toEqual({ name: "@akasha/held", private: true })
})

test("a manifest that moves states its ways in from the folder it arrives in", () => {
  const under: Manifesting = {
    at: "akasha/held/core/package.json",
    folder: "akasha/held/core",
    arriving: FOLDER,
  }
  const said = repointedIn(under, manifest(EXPORTS), moving([under.at, AT]))
  expect(JSON.parse(said ?? "").exports).toEqual({ "./one": "./core/one/one.module.code.ts" })
})

test("a manifest moving with all it names keeps the paths it already states", () => {
  const under: Manifesting = { at: AT, folder: FOLDER, arriving: "akasha/deep" }
  const said = repointedIn(
    under,
    manifest(EXPORTS),
    moving([AT, "akasha/deep/package.json"], [WAS, "akasha/deep/one/one.module.code.ts"])
  )
  expect(said).toBeNull()
})

test("a manifest that will not parse is left as it is", () => {
  expect(repointedIn(HELD, "{ not json", moving([WAS, NOW]))).toBeNull()
})

test("a manifest naming no way in is left as it is", () => {
  expect(repointedIn(HELD, '{ "name": "@akasha/held" }\n', moving([WAS, NOW]))).toBeNull()
})

test("a target that is no string names no way in", () => {
  expect(
    repointedIn(
      HELD,
      manifest({ "./one": { import: "./one/one.module.code.ts" } }),
      moving([WAS, NOW])
    )
  ).toBeNull()
})

test("what is rewritten is found by its path and holds its new text", () => {
  const bodies: Readonly<Record<string, string>> = { [AT]: manifest(EXPORTS) }
  const said = manifestingOver(moving([WAS, NOW]), (path) => bodies[path] ?? null)
  expect(said.map((one) => one.at)).toEqual([AT])
  expect(said.map((one) => one.to)).toEqual([AT])
  expect(JSON.parse(said[0]?.text ?? "").exports).toEqual({
    "./one": "./deep/one/one.module.code.ts",
  })
})

test("a manifest that moves is written where the manifest arrives", () => {
  const to = "akasha/held/package.json"
  const from = "akasha/held/core/package.json"
  const bodies: Readonly<Record<string, string>> = { [from]: manifest(EXPORTS) }
  const said = manifestingOver(moving([from, to]), (path) => bodies[path] ?? null)
  expect(said.map((one) => one.to)).toEqual([to])
  expect(JSON.parse(said[0]?.text ?? "").exports).toEqual({
    "./one": "./core/one/one.module.code.ts",
  })
})

test("a move touching no package rewrites nothing", () => {
  expect(manifestingOver(moving([WAS, NOW]), () => null).length).toBe(0)
})
