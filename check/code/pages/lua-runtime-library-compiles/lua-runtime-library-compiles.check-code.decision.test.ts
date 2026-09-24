import { afterAll, expect, test } from "bun:test"
import {
  builtFrom,
  foundIn,
  judgedAcross,
  reachedOver,
} from "akasha/check/code/pages/lua-runtime-library-compiles/lua-runtime-library-compiles.check-code.decision.code.ts"
import {
  ALONE,
  BROKEN,
  bodiesOf,
  CONFIG,
  LIBRARY,
  LUA50,
  librarying,
  ONE,
  PAGE,
  REACHING,
  scratch,
  TWO,
  TWO_BODY,
} from "akasha/check/code/pages/lua-runtime-library-compiles/lua-runtime-library-compiles.check-code.decision.test-fixtures.ts"

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
      code: 2322,
      said: "Type 'number' is not assignable. The types differ.",
    },
    { path: null, line: 0, column: 0, code: 18003, said: "No inputs were found." },
  ])
})

test("a config beside a library is input to the check as readily as TypeScript is", () => {
  expect(builtFrom("lib/tsconfig.lua50.json")).toBe(true)
  expect(builtFrom("lib/src/one.ts")).toBe(true)
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
