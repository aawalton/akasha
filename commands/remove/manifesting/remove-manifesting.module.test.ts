import { afterAll, expect, test } from "bun:test"
import {
  fileIn,
  HELD,
  naming,
  PACKAGE_WITH_WAYS,
  PACKAGE_WITHOUT_GONE,
  removing,
  reportOf,
  scratch,
  WAYS_IN,
  waysWorld,
} from "../remove.command.test-fixtures.ts"
import {
  landsOn,
  manifestsAbove,
  waysGoneIn,
  withoutWaysIn,
} from "./remove-manifesting.module.code.ts"

afterAll(scratch.sweep)

const MANIFEST = `{
  "name": "@akasha/held",
  "exports": {
    "./one": "./one/one.module.code.ts",
    "./two": "./two/two.module.code.ts"
  }
}
`

test("a way in is resolved against the folder its manifest sits in", () => {
  expect(landsOn("held/package.json", "./one/one.module.code.ts")).toBe(
    "held/one/one.module.code.ts"
  )
  expect(landsOn("package.json", "./one/one.module.code.ts")).toBe("one/one.module.code.ts")
})

test("a way in whose file goes is named and one whose file stays is not", () => {
  const going = new Set(["held/one/one.module.code.ts"])
  expect(waysGoneIn("held/package.json", MANIFEST, going)).toEqual(["./one"])
})

test("no way in is named where nothing it lands on goes", () => {
  expect(waysGoneIn("held/package.json", MANIFEST, new Set(["held/three/three.ts"]))).toEqual([])
})

test("a manifest that will not parse has no way in dropped", () => {
  expect(waysGoneIn("held/package.json", "{ not json", new Set(["held/one.ts"]))).toEqual([])
})

test("dropping a way in keeps the rest of the manifest as it was", () => {
  expect(withoutWaysIn("held/package.json", MANIFEST, new Set(["./one"]))).toBe(`{
  "name": "@akasha/held",
  "exports": {
    "./two": "./two/two.module.code.ts"
  }
}
`)
})

test("every manifest above what goes is read", () => {
  const there = (path: string) => path === "package.json" || path === "held/package.json"
  expect(manifestsAbove(new Set(["held/one/one.ts"]), there)).toEqual([
    "held/package.json",
    "package.json",
  ])
})

test("a manifest the removal itself takes is passed over", () => {
  const there = () => true
  expect(manifestsAbove(new Set(["held/one.ts", "held/package.json"]), there)).toEqual([
    "package.json",
  ])
})

test("a way in is dropped in the same commit as the file it lands on", async () => {
  const root = waysWorld()
  const said = await removing(root, naming("temper/one/gone"))
  expect(said.refusals).toEqual([])
  expect(fileIn(root, WAYS_IN)).toBe(PACKAGE_WITHOUT_GONE)
  expect(reportOf(said)).toContain("stopped naming 1 way in")
})

test("a way in whose file the removal leaves keeps its place", async () => {
  const root = waysWorld()
  const said = await removing(root, naming(HELD))
  expect(said.refusals).toEqual([])
  expect(fileIn(root, WAYS_IN)).toBe(PACKAGE_WITH_WAYS)
})
