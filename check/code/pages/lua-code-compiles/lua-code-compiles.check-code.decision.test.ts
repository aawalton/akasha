import { afterAll, expect, test } from "bun:test"
import {
  addonsJudged,
  builtFrom,
  foundIn,
  judgedAcross,
  reachedOver,
} from "akasha/check/code/pages/lua-code-compiles/lua-code-compiles.check-code.decision.code.ts"
import {
  ACCESSOR,
  ALONE,
  BROKEN,
  bodiesOf,
  CONFIG,
  ENTERING,
  ENTRY,
  FILTER,
  HELD_ADDON,
  LIBRARY,
  LUA50,
  laidOver,
  librarying,
  ONE,
  PAGE,
  PROPERTY,
  REACHING,
  scratch,
  TWO,
  TWO_BODY,
} from "akasha/check/code/pages/lua-code-compiles/lua-code-compiles.check-code.decision.test-fixtures.ts"

afterAll(scratch.sweep)

function judged(
  files: Readonly<Record<string, string>>,
  library: typeof ALONE = ALONE
): ReturnType<typeof judgedAcross> {
  const bodies = librarying(files)
  return judgedAcross([library], Object.keys(bodies), bodiesOf(bodies))
}

test("what the compiler prints is read as one error to a line, carrying the lines indented under it", () => {
  const said = foundIn(
    "lib/src/one.ts(3,7): error TS2322: Type 'number' is not assignable.\n" +
      "  The types differ.\n" +
      "error TS18003: No inputs were found.\n"
  )
  expect(said).toEqual([
    {
      path: "lib/src/one.ts",
      line: 3,
      column: 7,
      code: "2322",
      said: "Type 'number' is not assignable. The types differ.",
    },
    { path: null, line: 0, column: 0, code: "18003", said: "No inputs were found." },
  ])
})

test("an error the Lua compiler raises is read as one the TypeScript compiler raises", () => {
  const said = foundIn(
    "lib/src/one.ts(4,5): error TSTL: Accessors in object literal are not supported.\n"
  )
  expect(said).toEqual([
    {
      path: "lib/src/one.ts",
      line: 4,
      column: 5,
      code: "TL",
      said: "Accessors in object literal are not supported.",
    },
  ])
})

test("a config, a manifest and a body of TypeScript are input to the check, and a note is not", () => {
  expect(builtFrom("lib/tsconfig.lua50.json")).toBe(true)
  expect(builtFrom("lib/src/one.ts")).toBe(true)
  expect(builtFrom("tsconfig.base.json")).toBe(true)
  expect(builtFrom("temper/held/held.temper-addon.addon-manifest.json")).toBe(true)
  expect(builtFrom("temper/held/addon.json")).toBe(true)
  expect(builtFrom("lib/notes.md")).toBe(false)
})

test("a change reaches a library through its page, its configs, or a file they name", () => {
  expect(reachedOver([LIBRARY], [PAGE])).toEqual([LIBRARY])
  expect(reachedOver([LIBRARY], [LUA50])).toEqual([LIBRARY])
  expect(reachedOver([LIBRARY], [ONE])).toEqual([LIBRARY])
  expect(reachedOver([LIBRARY], ["lib/one.ts"])).toEqual([])
})

test("an error both configs report is said once, against its file, naming both configs", () => {
  const said = judged({ [ONE]: BROKEN }, LIBRARY)
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(ONE)
  expect(said[0]?.reason).toContain("TS2322 at line 1")
  expect(said[0]?.reason).toContain(`under ${CONFIG} and ${LUA50}`)
})

test("the akasha package name resolves inside the mirror, so a named file reaches another", () => {
  expect(judged({ [ONE]: REACHING, [TWO]: TWO_BODY })).toEqual([])
  const said = judged({ [ONE]: REACHING })
  expect(said.map((one) => one.path)).toEqual([ONE])
  expect(said[0]?.reason).toContain("TS2307")
})

test("an object-literal accessor in a file an addon imports is refused against that file", () => {
  const laid = laidOver({ [ENTRY]: ENTERING, [FILTER]: ACCESSOR })
  const said = addonsJudged([HELD_ADDON], laid.tree, laid.bytes)
  const held = said.filter((one) => one.path === FILTER)
  expect(held).toHaveLength(1)
  expect(held[0]?.reason).toContain("TSTL")
  expect(held[0]?.reason).toContain("Accessors in object literal are not supported")
  expect(held[0]?.reason).toContain("under HeldAddon")
})

test("the same file stating a plain property compiles clean under the addon", () => {
  const laid = laidOver({ [ENTRY]: ENTERING, [FILTER]: PROPERTY })
  expect(addonsJudged([HELD_ADDON], laid.tree, laid.bytes)).toEqual([])
})

test("an addon whose bundle entry is not there is refused against its page", () => {
  const laid = laidOver({ [FILTER]: PROPERTY })
  const said = addonsJudged([HELD_ADDON], laid.tree, laid.bytes)
  expect(said.map((one) => one.path)).toEqual([HELD_ADDON.page])
  expect(said[0]?.reason).toContain("bundle entry")
})

test("an addon naming no bundle entry is compiled by nothing", () => {
  const laid = laidOver({ [ENTRY]: ENTERING, [FILTER]: ACCESSOR })
  const mute = { ...HELD_ADDON, entrySlug: null, entry: null }
  expect(addonsJudged([mute], laid.tree, laid.bytes)).toEqual([])
})
