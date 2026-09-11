import { expect, test } from "bun:test"
import {
  calledIn,
  dependsIn,
  reachesIn,
  reachingOver,
} from "akasha/code/package-manifest/package-manifest.module.code.ts"

const FOLDER = "akasha/pages-system/indexes"

const READING = `${FOLDER}/index-reading/index-reading.module.code.ts`

const SHAPE = `${FOLDER}/index-shape/index-shape.module.code.ts`

const MANIFEST = JSON.stringify({
  name: "@akasha/indexes",
  exports: {
    ".": "./index-reading/index-reading.module.code.ts",
    "./shape": "./index-shape/index-shape.module.code.ts",
  },
})

test("what a manifest calls its package is answered apart from the ways in", () => {
  expect(calledIn(MANIFEST)).toBe("@akasha/indexes")
  expect(calledIn(JSON.stringify({ name: "one" }))).toBe("one")
})

test("a manifest naming its package nothing is called nothing", () => {
  expect(calledIn(JSON.stringify({ exports: { ".": "./a.ts" } }))).toBe(null)
  expect(calledIn(JSON.stringify({ name: 7 }))).toBe(null)
  expect(calledIn("{ this is not json\n")).toBe(null)
  expect(calledIn("null")).toBe(null)
})

test("a body that is not there calls its package nothing", () => {
  expect(calledIn(null)).toBe(null)
})

test("the names a manifest depends on are answered apart from the ways in", () => {
  const said = JSON.stringify({ name: "one", dependencies: { two: "1.0.0", three: "workspace:*" } })
  expect([...dependsIn(said)]).toEqual(["two", "three"])
})

test("every kind of dependency block a manifest holds is read", () => {
  const said = JSON.stringify({
    dependencies: { one: "1" },
    devDependencies: { two: "1" },
    peerDependencies: { three: "1" },
    optionalDependencies: { four: "1" },
  })
  expect([...dependsIn(said)]).toEqual(["one", "two", "three", "four"])
})

test("a dependency block that is no object names nothing depended on", () => {
  expect([...dependsIn(JSON.stringify({ dependencies: "one" }))]).toEqual([])
  expect([...dependsIn(JSON.stringify({ dependencies: ["one"] }))]).toEqual([])
  expect([...dependsIn(JSON.stringify({ dependencies: null }))]).toEqual([])
})

test("a manifest holding no dependency block depends on nothing", () => {
  expect([...dependsIn(MANIFEST)]).toEqual([])
  expect([...dependsIn("{ this is not json\n")]).toEqual([])
  expect([...dependsIn("null")]).toEqual([])
})

test("a key that is a lone dot names the package itself", () => {
  expect(reachesIn(FOLDER, MANIFEST).get("@akasha/indexes")).toBe(READING)
})

test("every other key is reached by the name followed by that key past its opening dot", () => {
  expect(reachesIn(FOLDER, MANIFEST).get("@akasha/indexes/shape")).toBe(SHAPE)
})

test("a target is resolved against the folder the manifest sits in", () => {
  const held = reachesIn("akasha/one", JSON.stringify({ name: "one", exports: { ".": "./a.ts" } }))
  expect(held.get("one")).toBe("akasha/one/a.ts")
})

test("a manifest stating one string for its exports is read as stating a lone dot", () => {
  const held = reachesIn(FOLDER, JSON.stringify({ name: "@akasha/indexes", exports: "./a.ts" }))
  expect([...held]).toEqual([["@akasha/indexes", `${FOLDER}/a.ts`]])
})

test("a target that is no string names no way in", () => {
  const said = JSON.stringify({ name: "one", exports: { ".": { import: "./a.ts" } } })
  expect([...reachesIn(FOLDER, said)]).toEqual([])
})

test("a key that is neither a lone dot nor opens with one names no way in", () => {
  const said = JSON.stringify({ name: "one", exports: { import: "./a.ts" } })
  expect([...reachesIn(FOLDER, said)]).toEqual([])
})

test("a manifest calling its package nothing names no way in", () => {
  expect([...reachesIn(FOLDER, JSON.stringify({ exports: { ".": "./a.ts" } }))]).toEqual([])
})

test("a manifest whose name is no string names no way in", () => {
  expect([...reachesIn(FOLDER, JSON.stringify({ name: 7, exports: { ".": "./a.ts" } }))]).toEqual(
    []
  )
})

test("a manifest stating no exports names no way in", () => {
  expect([...reachesIn(FOLDER, JSON.stringify({ name: "one" }))]).toEqual([])
})

test("a manifest stating an empty exports map names no way in", () => {
  expect([...reachesIn(FOLDER, JSON.stringify({ name: "one", exports: {} }))]).toEqual([])
})

test("a manifest that will not parse names no way in", () => {
  expect([...reachesIn(FOLDER, "{ this is not json\n")]).toEqual([])
})

test("a manifest holding anything but an object names no way in", () => {
  expect([...reachesIn(FOLDER, "null")]).toEqual([])
  expect([...reachesIn(FOLDER, '"@akasha/indexes"')]).toEqual([])
})

test("what many manifests name is read as one naming", () => {
  const one = reachesIn("akasha/one", JSON.stringify({ name: "one", exports: { ".": "./a.ts" } }))
  const two = reachesIn("akasha/two", JSON.stringify({ name: "two", exports: { ".": "./b.ts" } }))
  expect([...reachingOver([one, two])]).toEqual([
    ["one", "akasha/one/a.ts"],
    ["two", "akasha/two/b.ts"],
  ])
})

test("a specifier two manifests both name lands where the first of them says", () => {
  const one = reachesIn("akasha/one", JSON.stringify({ name: "one", exports: { ".": "./a.ts" } }))
  const two = reachesIn("akasha/two", JSON.stringify({ name: "one", exports: { ".": "./b.ts" } }))
  expect(reachingOver([one, two]).get("one")).toBe("akasha/one/a.ts")
})

test("no manifest at all is read as naming nothing", () => {
  expect([...reachingOver([])]).toEqual([])
})
