import { expect, test } from "bun:test"
import { manifestingOver, manifestsOver, repointedIn } from "./move-manifesting.module.code.ts"

const FOLDER = "akasha/held"

const AT = "akasha/held/package.json"

const WAS = "akasha/held/one/one.module.code.ts"

const NOW = "akasha/held/deep/one/one.module.code.ts"

function moving(pairs: Readonly<Record<string, string>>): ReadonlyMap<string, string> {
  return new Map(Object.entries(pairs))
}

function manifest(exports: unknown): string {
  return `${JSON.stringify({ name: "@akasha/held", private: true, exports }, null, 2)}\n`
}

const EXPORTS = { "./one": "./one/one.module.code.ts" }

test("the manifest above what moved is the one looked at", () => {
  expect(manifestsOver(moving({ [WAS]: NOW }), (path) => path === AT)).toEqual([AT])
})

test("a file under nested packages is answered for by every manifest above it", () => {
  const held = ["akasha/held/package.json", "akasha/held/one/package.json"]
  expect(manifestsOver(moving({ [WAS]: NOW }), (path) => held.includes(path))).toEqual(
    [...held].sort()
  )
})

test("the walk up stops at the akasha folder", () => {
  expect(manifestsOver(moving({ [WAS]: NOW }), () => true)).not.toContain("package.json")
})

test("a manifest that moves itself is not one of them", () => {
  const there = (path: string): boolean => path !== "akasha/package.json"
  expect(manifestsOver(moving({ [WAS]: NOW, [AT]: "akasha/other/package.json" }), there)).toEqual([
    "akasha/held/one/package.json",
  ])
})

test("a way in whose file moved is repointed to where it arrived", () => {
  const said = repointedIn(FOLDER, manifest(EXPORTS), moving({ [WAS]: NOW }))
  expect(said).not.toBeNull()
  expect(JSON.parse(said ?? "").exports).toEqual({ "./one": "./deep/one/one.module.code.ts" })
})

test("what a manifest says besides its ways in is kept as it is", () => {
  const said = repointedIn(FOLDER, manifest(EXPORTS), moving({ [WAS]: NOW }))
  const held = JSON.parse(said ?? "")
  expect(held.name).toBe("@akasha/held")
  expect(held.private).toBe(true)
})

test("a way in whose file did not move is left alone", () => {
  expect(
    repointedIn(FOLDER, manifest(EXPORTS), moving({ "akasha/other/x.ts": "akasha/o/x.ts" }))
  ).toBeNull()
})

test("a way in beside one that moved keeps what it says", () => {
  const said = repointedIn(
    FOLDER,
    manifest({ "./one": "./one/one.module.code.ts", "./two": "./two/two.module.code.ts" }),
    moving({ [WAS]: NOW })
  )
  expect(JSON.parse(said ?? "").exports).toEqual({
    "./one": "./deep/one/one.module.code.ts",
    "./two": "./two/two.module.code.ts",
  })
})

test("a file arriving outside the package is left for the checks to refuse", () => {
  expect(
    repointedIn(FOLDER, manifest(EXPORTS), moving({ [WAS]: "akasha/other/one.module.code.ts" }))
  ).toBeNull()
})

test("a manifest stating one string for its exports is repointed as one", () => {
  const said = repointedIn(FOLDER, manifest("./one/one.module.code.ts"), moving({ [WAS]: NOW }))
  expect(JSON.parse(said ?? "").exports).toBe("./deep/one/one.module.code.ts")
})

test("a manifest that will not parse is left as it is", () => {
  expect(repointedIn(FOLDER, "{ not json", moving({ [WAS]: NOW }))).toBeNull()
})

test("a manifest naming no way in is left as it is", () => {
  expect(repointedIn(FOLDER, '{ "name": "@akasha/held" }\n', moving({ [WAS]: NOW }))).toBeNull()
})

test("a target that is no string names no way in", () => {
  expect(
    repointedIn(
      FOLDER,
      manifest({ "./one": { import: "./one/one.module.code.ts" } }),
      moving({ [WAS]: NOW })
    )
  ).toBeNull()
})

test("what is rewritten is found by its path and holds its new text", () => {
  const bodies: Readonly<Record<string, string>> = { [AT]: manifest(EXPORTS) }
  const said = manifestingOver(moving({ [WAS]: NOW }), (path) => bodies[path] ?? null)
  expect([...said.keys()]).toEqual([AT])
  expect(JSON.parse(said.get(AT) ?? "").exports).toEqual({
    "./one": "./deep/one/one.module.code.ts",
  })
})

test("a move touching no package rewrites nothing", () => {
  expect(manifestingOver(moving({ [WAS]: NOW }), () => null).size).toBe(0)
})
