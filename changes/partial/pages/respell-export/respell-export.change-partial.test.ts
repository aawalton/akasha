import { afterAll, expect, test } from "bun:test"
import {
  bodyOf,
  HELD_CODE,
  HELD_EXPORT,
  idOf,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "../../../../pages/indexes/indexing/indexing.module.test-fixtures.ts"
import { respelled } from "./respell-export.change-partial.code.ts"

afterAll(scratch.sweep)

const CARRIED = "carried"

const SHORT_PAGE = "akasha/five/short.module.ts"

const SHORT_CODE = "akasha/five/short.module.code.ts"

const SHORT_BODY = `import { ${HELD_EXPORT} } from "../one/held.module.code.ts"

export const short = { ${HELD_EXPORT} }
`

const shorthandRepo = (): string =>
  indexedRepo({
    [SHORT_PAGE]: bodyOf({ id: idOf("f"), pageTypeSlug: "module", slug: "short", code: "ts" }),
    [SHORT_CODE]: SHORT_BODY,
  })

test("the declaring file and the paths handed in beside it are both spelled anew", () => {
  const root = indexedRepo()
  const said = respelled(
    root,
    HELD_CODE,
    [HELD_CODE, NAMER_CODE],
    HELD_EXPORT,
    CARRIED,
    textIn(root)
  )
  expect(said.refused).toBe(null)
  expect([...(said.bodies ?? new Map()).keys()].sort()).toEqual([HELD_CODE, NAMER_CODE])
  expect(said.bodies?.get(HELD_CODE)).toBe(`export const ${CARRIED} = 1\n`)
  expect(said.bodies?.get(NAMER_CODE)).toBe(
    `import { ${CARRIED} } from "../one/held.module.code.ts"\n\nexport const named = ${CARRIED} + 1\n`
  )
})

test("a file left out of the paths handed in is left as that file is", () => {
  const root = indexedRepo()
  const said = respelled(root, HELD_CODE, [HELD_CODE], HELD_EXPORT, CARRIED, textIn(root))
  expect(said.refused).toBe(null)
  expect([...(said.bodies ?? new Map()).keys()]).toEqual([HELD_CODE])
})

test("a file exporting no such name is refused", () => {
  const root = indexedRepo()
  const said = respelled(root, HELD_CODE, [HELD_CODE], "missing", CARRIED, textIn(root))
  expect(said.bodies).toBe(null)
  expect(said.refused).toBe(`\`${HELD_CODE}\` exports no \`missing\``)
})

test("a file that would change and already reaches the new name is refused", () => {
  const root = indexedRepo()
  const said = respelled(
    root,
    HELD_CODE,
    [HELD_CODE, NAMER_CODE],
    HELD_EXPORT,
    "named",
    textIn(root)
  )
  expect(said.bodies).toBe(null)
  expect(said.refused).toBe(`\`${NAMER_CODE}\` already reaches a \`named\``)
})

test("a shorthand keeps its key and points its value at the new name", () => {
  const root = shorthandRepo()
  const said = respelled(
    root,
    HELD_CODE,
    [HELD_CODE, SHORT_CODE],
    HELD_EXPORT,
    CARRIED,
    textIn(root)
  )
  expect(said.refused).toBe(null)
  expect(said.bodies?.get(SHORT_CODE)).toBe(
    `import { ${CARRIED} } from "../one/held.module.code.ts"\n\nexport const short = { ${HELD_EXPORT}: ${CARRIED} }\n`
  )
})

test("the bodies are answered rather than written", () => {
  const root = indexedRepo()
  const text = textIn(root)
  expect(
    respelled(root, HELD_CODE, [HELD_CODE, NAMER_CODE], HELD_EXPORT, CARRIED, text).refused
  ).toBe(null)
  expect(text(HELD_CODE)).toBe(`export const ${HELD_EXPORT} = 1\n`)
  expect(text(NAMER_CODE)).toContain(`import { ${HELD_EXPORT} }`)
})
