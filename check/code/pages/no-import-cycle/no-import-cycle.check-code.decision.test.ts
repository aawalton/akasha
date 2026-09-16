import { afterAll, expect, test } from "bun:test"
import {
  addedIn,
  cyclesIn,
  reachingIn,
  refusalsAdded,
  refusalsOver,
} from "akasha/check/code/pages/no-import-cycle/no-import-cycle.check-code.decision.code.ts"
import {
  ALONE,
  AT,
  change,
  patched,
  pathsRefused,
  READS_ONE,
  READS_TWO,
  ROOT,
  refused,
  scratch,
  shadowOf,
  TWO_AT,
} from "akasha/check/code/pages/no-import-cycle/no-import-cycle.check-code.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("an import the change did not add is no added import", () => {
  const held = patched({ [AT]: READS_TWO, [TWO_AT]: READS_ONE }, { [AT]: `${READS_TWO}\n` })
  expect(addedIn(held, shadowOf(held))).toEqual([])
  expect(refusalsAdded(held, shadowOf(held))).toEqual([])
})

test("an import the change writes is an added import", () => {
  const held = patched({ [AT]: ALONE, [TWO_AT]: READS_ONE }, { [AT]: READS_TWO })
  expect(addedIn(held, shadowOf(held))).toEqual([{ from: AT, to: TWO_AT }])
})

test("every import a file the change adds carries is an added import", () => {
  const held = patched({ [TWO_AT]: READS_ONE }, { [AT]: READS_TWO })
  expect(addedIn(held, shadowOf(held))).toEqual([{ from: AT, to: TWO_AT }])
})

test("an added import the file it names reaches back along is a cycle", () => {
  const held = patched({ [AT]: ALONE, [TWO_AT]: READS_ONE }, { [AT]: READS_TWO })
  expect(refusalsAdded(held, shadowOf(held)).map((one) => one.path)).toEqual([AT, TWO_AT])
})

test("a cycle already there when the change arrived is refused nothing here", () => {
  const held = patched({ [AT]: READS_TWO, [TWO_AT]: READS_ONE }, { [AT]: `${READS_TWO}\n` })
  expect(refusalsAdded(held, shadowOf(held))).toEqual([])
  expect(refusalsOver(held, shadowOf(held)).map((one) => one.path)).toEqual([AT, TWO_AT])
})

test("a file that begins importing itself is refused by the added import", () => {
  const held = patched({ [AT]: ALONE }, { [AT]: 'import { a } from "./one.ts"\n' })
  const said = refusalsAdded(held, shadowOf(held))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("imports itself")
})

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
  expect(cyclesIn(reachingIn(carried, shadowOf(carried)))).toHaveLength(1)
  expect(refusalsOver(carried, shadowOf(carried))).toEqual([])
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

test("a loop closed only through an awaited `import()` is not refused", () => {
  expect(
    pathsRefused({
      "akasha/one.ts": 'import { two } from "./two.ts"\n\nexport const one = two\n',
      "akasha/two.ts": 'export const two = async () => await import("./one.ts")\n',
    })
  ).toEqual([])
})

test("a loop closed through a static import is refused", () => {
  expect(
    pathsRefused({
      "akasha/one.ts": 'import { two } from "./two.ts"\n\nexport const one = two\n',
      "akasha/two.ts": 'import { one } from "./one.ts"\n\nexport const two = () => one\n',
    })
  ).toEqual(["akasha/one.ts", "akasha/two.ts"])
})

test("a module named by an external module reference is reached as the file loads", () => {
  expect(
    pathsRefused({
      "akasha/one.ts": 'import { two } from "./two.ts"\n\nexport const one = two\n',
      "akasha/two.ts": 'import one = require("./one.ts")\n\nexport const two = one\n',
    })
  ).toEqual(["akasha/one.ts", "akasha/two.ts"])
})

test("a specifier landing on no file the folder holds closes nothing", () => {
  const held = change({ [AT]: 'import { a } from "./gone.ts"\n' })
  expect(reachingIn(held, shadowOf(held)).get(AT)).toEqual([])
})

test("a package specifier naming no path of its own is passed over", () => {
  const held = change({ [AT]: 'import ts from "typescript"\n\nexport const one = ts\n' })
  expect(reachingIn(held, shadowOf(held)).get(AT)).toEqual([])
})

test("a file that is not TypeScript is no part of the graph", () => {
  const held = change({ "akasha/notes.txt": "" })
  expect([...reachingIn(held, shadowOf(held)).keys()]).toEqual([])
})

test("a body that is not text refuses rather than reaching nothing", () => {
  const at = (): Uint8Array => new Uint8Array([0xff, 0xfe, 0x00])
  const held = { root: ROOT, changed: ["akasha/raw.ts"], after: at, before: at }
  expect(() => reachingIn(held, shadowOf(held))).toThrow("akasha/raw.ts")
  expect(() => reachingIn(held, shadowOf(held))).toThrow("not valid UTF-8")
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
