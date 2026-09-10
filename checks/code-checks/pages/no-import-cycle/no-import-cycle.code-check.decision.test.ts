import { afterAll, expect, test } from "bun:test"
import {
  cyclesIn,
  reachedIn,
  reachingIn,
  refusalsOver,
} from "./no-import-cycle.code-check.decision.code.ts"
import {
  AT,
  change,
  pathsRefused,
  ROOT,
  refused,
  scratch,
} from "./no-import-cycle.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("two files that import each other by value are both refused", () => {
  const said = refused({
    "akasha/one.ts": 'import { two } from "./two.ts"\n\nexport const one = two\n',
    "akasha/two.ts": 'import { one } from "./one.ts"\n\nexport const two = one\n',
  })
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
  const said = refused({ "akasha/one.ts": 'import { a } from "./one.ts"\n' })
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
  const said = refused({
    "akasha/one.ts": 'import { two } from "./two.ts"\n\nexport const one = two\n',
    "akasha/two.ts": 'import { three } from "./three.ts"\n\nexport const two = three\n',
    "akasha/three.ts": 'import { one } from "./one.ts"\n\nexport const three = one\n',
  })
  expect(said).toHaveLength(3)
  expect(said[0]?.reason).toContain("`akasha/three.ts`")
  expect(said[0]?.reason).toContain("`akasha/two.ts`")
})

test("a cycle no file the change has sits in is refused nothing though it is reached", () => {
  const held = change({
    "akasha/one.ts": 'import { two } from "./two.ts"\n\nexport const one = two\n',
    "akasha/two.ts": 'import { three } from "./three.ts"\n\nexport const two = three\n',
    "akasha/three.ts": 'import { two } from "./two.ts"\n\nexport const three = two\n',
  })
  const carried = { ...held, changed: ["akasha/one.ts"] }
  expect(cyclesIn(reachingIn(carried))).toHaveLength(1)
  expect(refusalsOver(carried)).toEqual([])
})

test("an import written inside a string represents nothing", () => {
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
  expect(reachingIn(change({ [AT]: 'import { a } from "./gone.ts"\n' })).get(AT)).toEqual([])
})

test("a package specifier naming no path of its own is passed over", () => {
  expect(reachedIn(AT, 'import ts from "typescript"\n')).toEqual(["typescript"])
})

test("a file that is not TypeScript is no part of the graph", () => {
  expect([...reachingIn(change({ "akasha/notes.txt": "" })).keys()]).toEqual([])
})

test("a body that is not text refuses rather than reaching nothing", () => {
  const at = (): Uint8Array => new Uint8Array([0xff, 0xfe, 0x00])
  const held = { root: ROOT, changed: ["akasha/raw.ts"], after: at, before: at }
  expect(() => reachingIn(held)).toThrow("akasha/raw.ts")
  expect(() => reachingIn(held)).toThrow("not valid UTF-8")
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
