import { afterAll, expect, test } from "bun:test"
import { move } from "../move.command.code.ts"
import {
  BINARY,
  BINARY_BODY,
  bodyIn,
  FOLDER,
  FOLDER_AT,
  FOLDER_PAIR,
  givenIn,
  head,
  LOCK,
  LOCKED,
  outsideMoved,
  outsideWorld,
  scratch,
  told,
} from "../move.command.test-fixtures.ts"
import { namedOutside, outsideSaid, repointedText } from "./move-outside.module.code.ts"

afterAll(scratch.sweep)

const MOVED = new Map([[FOLDER, FOLDER_AT]])

const HELD_UNDER = "akasha/one/held.ts"

test("a path is repointed where a segment ends after it and left alone where one runs on", () => {
  const said = repointedText('"akasha/one" "akasha/one-other" "akasha/one/held.ts"', MOVED)
  expect(said).toBe('"akasha/far/one" "akasha/one-other" "akasha/far/one/held.ts"')
})

test("a name a path character leads and a name a package name leads are left alone", () => {
  const said = repointedText('xakasha/one "@akasha/one" "repo/akasha/one" "akasha/one"', MOVED)
  expect(said).toBe('xakasha/one "@akasha/one" "repo/akasha/one" "akasha/far/one"')
})

test("the longest path matching at one place is the path written back", () => {
  const moved = new Map([...MOVED, [HELD_UNDER, "akasha/far/held.ts"]])
  expect(repointedText(`"${HELD_UNDER}"`, moved)).toBe('"akasha/far/held.ts"')
})

test("a body naming nothing that moved comes back as that body was", () => {
  expect(repointedText(LOCKED, new Map())).toBe(LOCKED)
})

test("what names a moved path is looked for outside the akasha folder alone", () => {
  const root = outsideWorld()
  const found = namedOutside(root, head(root), MOVED)
  expect("paths" in found ? found.paths : ["it refused"]).toEqual([LOCK])
})

test("a body git reads as binary is left out of the search and out of the change", () => {
  const { root, said } = outsideMoved()
  expect(said.refusals).toEqual([])
  expect(bodyIn(root, BINARY)).toBe(BINARY_BODY)
  expect(told(said)).not.toContain(BINARY)
})

test("a dry run outside the akasha folder writes nothing and names what it would repoint", () => {
  const root = outsideWorld()
  const said = move([...FOLDER_PAIR, "--dry-run"], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(bodyIn(root, LOCK)).toBe(LOCKED)
  expect(told(said)).toContain(`outside \`akasha/\` naming what moved would be repointed — ${LOCK}`)
})

test("finding nothing outside the akasha folder is said as plainly as finding something", () => {
  expect(outsideSaid([], false)[0]).toBe("no file outside `akasha/` named what moved")
  expect(outsideSaid([LOCK], true)[0]).toContain(`would be repointed — ${LOCK}`)
  expect(outsideSaid([], false)[1]).toContain("is left alone")
})
