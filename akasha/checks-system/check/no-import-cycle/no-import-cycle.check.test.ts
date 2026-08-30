import { expect, test } from "bun:test"
import type { Leaving } from "../../judging/judging.module.code.ts"
import { cyclesIn, noImportCycle, reachedIn, reachingIn } from "./no-import-cycle.check.code.ts"

const ROOT = "/repo"

const AT = "akasha/one.ts"

const encoder = new TextEncoder()

function leaving(bodies: Readonly<Record<string, string>>): Leaving {
  const at = (path: string): Uint8Array | null => {
    const said = bodies[path]
    return said === undefined ? null : encoder.encode(said)
  }
  return { root: ROOT, changed: Object.keys(bodies).sort(), at, was: at }
}

function pathsRefused(bodies: Readonly<Record<string, string>>): readonly string[] {
  return noImportCycle(leaving(bodies)).map((one) => one.path)
}

test("two files that import each other by value are both refused", () => {
  const said = noImportCycle(
    leaving({
      "akasha/one.ts": 'import { two } from "./two.ts"\n\nexport const one = two\n',
      "akasha/two.ts": 'import { one } from "./one.ts"\n\nexport const two = one\n',
    })
  )
  expect(said.map((each) => each.path)).toEqual(["akasha/one.ts", "akasha/two.ts"])
  expect(said[0]?.reason).toContain("`akasha/two.ts`")
  expect(said[1]?.reason).toContain("`akasha/one.ts`")
})

test("a cycle closed only by `import type` is let through", () => {
  expect(
    pathsRefused({
      "akasha/one.ts": 'import type { Two } from "./two.ts"\n\nexport type One = Two\n',
      "akasha/two.ts": 'import type { One } from "./one.ts"\n\nexport type Two = One\n',
    })
  ).toEqual([])
})

test("a cycle closed by a list whose every name is `type` is let through", () => {
  expect(
    pathsRefused({
      "akasha/one.ts": 'import { type Two } from "./two.ts"\n\nexport type One = Two\n',
      "akasha/two.ts": 'import { type One } from "./one.ts"\n\nexport type Two = One\n',
    })
  ).toEqual([])
})

test("one value among the names makes the edge count, and the cycle is refused", () => {
  expect(
    pathsRefused({
      "akasha/one.ts": 'import { type Two, two } from "./two.ts"\n\nexport const one = two\n',
      "akasha/two.ts": 'import { one } from "./one.ts"\n\nexport const two = one\n',
    })
  ).toEqual(["akasha/one.ts", "akasha/two.ts"])
})

test("an import binding no name is an edge, because it still makes the module run", () => {
  expect(
    pathsRefused({
      "akasha/one.ts": 'import "./two.ts"\n\nexport const one = 1\n',
      "akasha/two.ts": 'import { one } from "./one.ts"\n\nexport const two = one\n',
    })
  ).toEqual(["akasha/one.ts", "akasha/two.ts"])
})

test("a type-only `export from` is no edge, and a value `export from` is", () => {
  expect(
    pathsRefused({
      "akasha/one.ts": 'export type { Two } from "./two.ts"\n',
      "akasha/two.ts": 'import type { One } from "./one.ts"\n\nexport type Two = One\n',
    })
  ).toEqual([])
  expect(
    pathsRefused({
      "akasha/one.ts": 'export { two } from "./two.ts"\n',
      "akasha/two.ts": 'import { one } from "./one.ts"\n\nexport const two = one\n',
    })
  ).toEqual(["akasha/one.ts", "akasha/two.ts"])
})

test("a file that imports itself is refused, and says so plainly", () => {
  const said = noImportCycle(leaving({ "akasha/one.ts": 'import { a } from "./one.ts"\n' }))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("imports itself")
})

test("a chain that never comes back around is let through", () => {
  expect(
    pathsRefused({
      "akasha/one.ts": 'import { two } from "./two.ts"\n\nexport const one = two\n',
      "akasha/two.ts": 'import { three } from "./three.ts"\n\nexport const two = three\n',
      "akasha/three.ts": "export const three = 3\n",
    })
  ).toEqual([])
})

test("a cycle of three names the two others it reaches", () => {
  const said = noImportCycle(
    leaving({
      "akasha/one.ts": 'import { two } from "./two.ts"\n\nexport const one = two\n',
      "akasha/two.ts": 'import { three } from "./three.ts"\n\nexport const two = three\n',
      "akasha/three.ts": 'import { one } from "./one.ts"\n\nexport const three = one\n',
    })
  )
  expect(said).toHaveLength(3)
  expect(said[0]?.reason).toContain("`akasha/three.ts`")
  expect(said[0]?.reason).toContain("`akasha/two.ts`")
})

test("an import written inside a string stands for nothing", () => {
  const body = "const said = 'import { one } from \"./one.ts\"'\n\nexport const two = said\n"
  expect(
    pathsRefused({
      "akasha/one.ts": 'import { two } from "./two.ts"\n\nexport const one = two\n',
      "akasha/two.ts": body,
    })
  ).toEqual([])
})

test("a deferred `import()` is not counted", () => {
  expect(
    pathsRefused({
      "akasha/one.ts": 'import { two } from "./two.ts"\n\nexport const one = two\n',
      "akasha/two.ts": 'export const two = () => import("./one.ts")\n',
    })
  ).toEqual([])
})

test("a specifier landing on no file the folder holds closes nothing", () => {
  expect(reachingIn(leaving({ [AT]: 'import { a } from "./gone.ts"\n' })).get(AT)).toEqual([])
})

test("a package specifier naming no path of its own is passed over", () => {
  expect(reachedIn(AT, 'import ts from "typescript"\n')).toEqual(["typescript"])
})

test("a file outside the akasha folder is no part of the graph", () => {
  const held = reachingIn(
    leaving({
      "tools/one.ts": 'import { two } from "./two.ts"\n',
      "tools/two.ts": 'import { one } from "./one.ts"\n',
    })
  )
  expect([...held.keys()]).toEqual([])
})

test("a file that is not TypeScript is no part of the graph", () => {
  expect([...reachingIn(leaving({ "akasha/notes.txt": "" })).keys()]).toEqual([])
})

test("a body that is not text reaches nothing rather than throwing", () => {
  const at = (): Uint8Array => new Uint8Array([0xff, 0xfe, 0x00])
  const held = reachingIn({ root: ROOT, changed: ["akasha/raw.ts"], at, was: at })
  expect(held.get("akasha/raw.ts")).toEqual([])
})

test("two separate cycles are both found", () => {
  const held = cyclesIn(
    new Map([
      ["a", ["b"]],
      ["b", ["a"]],
      ["c", ["d"]],
      ["d", ["c"]],
      ["e", []],
    ])
  )
  expect(held).toHaveLength(2)
  expect(held.map((one) => one.length)).toEqual([2, 2])
})

test("a graph with no cycle answers none", () => {
  expect(
    cyclesIn(
      new Map([
        ["a", ["b", "c"]],
        ["b", ["c"]],
        ["c", []],
      ])
    )
  ).toEqual([])
})
