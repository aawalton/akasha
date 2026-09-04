import { expect, test } from "bun:test"
import {
  landsOn,
  manifestsAbove,
  waysGoneIn,
  withoutWaysIn,
} from "./remove-manifesting.module.code.ts"

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
