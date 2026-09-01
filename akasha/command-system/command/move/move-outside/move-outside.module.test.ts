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
  LOCK,
  LOCKED,
  outsideMoved,
  outsideWorld,
  REACHED,
  REACHER,
  reachMoved,
  scratch,
  told,
} from "../move.command.test-fixtures.ts"
import { outsideSaid, reachesIn, repointedText } from "./move-outside.module.code.ts"

afterAll(scratch.sweep)

const MOVED = new Map([[FOLDER, FOLDER_AT]])

const AT = "tools/lib/reach.ts"

test("a path spelled whole outside the akasha folder is repointed where it moved", () => {
  const said = repointedText(AT, '"akasha/one" "akasha/one-other"', MOVED)
  expect(said).toBe('"akasha/far/one" "akasha/one-other"')
})

test("a relative reach from outside is repointed to where what it resolves to arrived", () => {
  const said = repointedText(AT, '"../../akasha/one/held.module.ts"', MOVED)
  expect(said).toBe('"../../akasha/far/one/held.module.ts"')
})

test("a relative reach is resolved against the folder of the file carrying that reach", () => {
  const said = repointedText("tools/reach.ts", '"../akasha/one/held.module.ts"', MOVED)
  expect(said).toBe('"../akasha/far/one/held.module.ts"')
})

test("a relative reach closing with a slash keeps that slash and what follows the slash", () => {
  const said = repointedText(AT, '@source "../../akasha/one/**/*.ts"', MOVED)
  expect(said).toBe('@source "../../akasha/far/one/**/*.ts"')
})

test("a relative reach resolving to no path that moved is left alone", () => {
  const text = '"../../akasha/one-other/held.module.ts" "./one/held.module.ts"'
  expect(repointedText(AT, text, MOVED)).toBe(text)
})

test("a relative reach climbing out of the repository is left alone", () => {
  const text = '"../../../akasha/one/held.module.ts"'
  expect(repointedText(AT, text, MOVED)).toBe(text)
})

test("a reach is answered with where the reach sits and what it becomes", () => {
  const found = reachesIn(AT, 'x "../../akasha/one"', MOVED)
  expect(found.map((one) => one.now)).toEqual(["../../akasha/far/one"])
})

test("a body naming nothing that moved comes back as that body was", () => {
  expect(repointedText(LOCK, LOCKED, new Map())).toBe(LOCKED)
})

test("a file outside akasha reaching in by a relative path is repointed by a move", () => {
  const { root, said } = reachMoved()
  expect(said.refusals).toEqual([])
  expect(bodyIn(root, REACHER)).toBe(REACHED)
})

test("what reached in by a relative path is told apart from what spelled the path whole", () => {
  const { said } = reachMoved()
  expect(told(said)).toContain(
    `reached in by a relative path rather than by the path itself — ${REACHER}`
  )
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
  expect(outsideSaid([], [], false)[0]).toBe("no file outside `akasha/` named what moved")
  expect(outsideSaid([LOCK], [], true)[0]).toContain(`would be repointed — ${LOCK}`)
  expect(outsideSaid([], [], false)[1]).toContain("is left alone")
})
