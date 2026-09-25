import { afterAll, expect, test } from "bun:test"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { exportRenamed } from "akasha/change/modules/export-renaming/export-renaming.module.code.ts"
import { bodiesIn } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { bodyAt } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { NOWHERE } from "akasha/code/reading/modules/code-typing/code-typing.module.test-fixtures.ts"
import {
  HELD_CODE,
  HELD_EXPORT,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const CARRIED = "carried"

const OWN_CODE = "akasha/six/own.module.code.ts"

const OWN_BODY = `type Kept = { readonly one: number }

const kept: Kept = { one: 1 }

export const held = kept.one
`

const ownBody = bodyAt(OWN_CODE, OWN_BODY)

test("the declaring body and the paths handed in beside it are both spelled anew", () => {
  const root = indexedRepo()
  const text = textIn(root)
  const said = exportRenamed(
    root,
    HELD_CODE,
    [HELD_CODE, NAMER_CODE],
    HELD_EXPORT,
    CARRIED,
    text,
    NOWHERE
  )
  const bodies = bodiesIn(said, text)

  expect(said.refused).toBe(null)
  expect([...new Set(pathsIn(said))].sort()).toEqual([HELD_CODE, NAMER_CODE])
  expect(bodies.get(HELD_CODE)).toBe(`export const ${CARRIED} = 1\n`)
  expect(bodies.get(NAMER_CODE) ?? "").toContain(`import { ${CARRIED} }`)
})

test("a name the body declares and exports nowhere is spelled anew over that body", () => {
  const root = scratch.rootFor("export-renaming-")
  const said = exportRenamed(root, OWN_CODE, [OWN_CODE], "kept", CARRIED, ownBody, NOWHERE)

  expect(said.refused).toBe(null)
  expect([...new Set(pathsIn(said))]).toEqual([OWN_CODE])
  expect(bodiesIn(said, ownBody).get(OWN_CODE)).toBe(OWN_BODY.replaceAll("kept", CARRIED))
})

test("a body declaring no such name is refused", () => {
  const root = indexedRepo()
  const text = textIn(root)
  const said = exportRenamed(root, HELD_CODE, [HELD_CODE], "missing", CARRIED, text, NOWHERE)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${HELD_CODE}\` declares no \`missing\``)
})

test("a body that would change and already reaches the new name is refused", () => {
  const root = indexedRepo()
  const said = exportRenamed(
    root,
    HELD_CODE,
    [HELD_CODE, NAMER_CODE],
    HELD_EXPORT,
    "named",
    textIn(root),
    NOWHERE
  )

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${NAMER_CODE}\` already reaches a \`named\``)
})

const SEAT_CODE = "akasha/six/seat.module.code.ts"

const CHAIR_CODE = "akasha/six/chair.module.code.ts"

const ALIASED_BODIES: Readonly<Record<string, string>> = {
  [SEAT_CODE]: "export const seat = 1\n",
  [CHAIR_CODE]:
    'import { seat as chair } from "./seat.module.code.ts"\n' +
    "\n" +
    "export function stool(): number {\n" +
    "  return chair\n" +
    "}\n",
}

const aliasedText = (path: string): string | null => ALIASED_BODIES[path] ?? null

test("a body importing the name under another binds no new name, so it is not refused", () => {
  const root = scratch.rootFor("export-renaming-")
  const said = exportRenamed(
    root,
    SEAT_CODE,
    [SEAT_CODE, CHAIR_CODE],
    "seat",
    "stool",
    aliasedText,
    NOWHERE
  )

  expect(said.refused).toBe(null)
  expect(bodiesIn(said, aliasedText).get(CHAIR_CODE) ?? "").toContain(
    'import { stool as chair } from "./seat.module.code.ts"'
  )
})

test("a path left out of the paths handed in is left as that body is", () => {
  const root = indexedRepo()
  const text = textIn(root)
  const said = exportRenamed(root, HELD_CODE, [HELD_CODE], HELD_EXPORT, CARRIED, text, NOWHERE)

  expect(said.refused).toBe(null)
  expect([...pathsIn(said)].sort()).toEqual([HELD_CODE])
})
