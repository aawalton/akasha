import { expect, test } from "bun:test"
import { dirname } from "node:path"
import {
  renameSpellings,
  runChange,
  spelledIn,
} from "akasha/change/agent/file-content/rename-spellings/rename-spellings.change-agent.code.ts"
import { NOT_TEXT } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { bodiesIn, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { worldOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { fileProperty } from "akasha/page/file-property/file-property.page-type.ts"
import { referencedBy } from "akasha/page/properties/referenced-by.file-property.ts"

const REFERENCED_BY = `${fileProperty.slug}/${referencedBy.slug}` as const

const UNDER = "temper/held"

const DECLARED = "temper/held/ids/ids.type-declaration.d.ts"

const STRINGS = "temper/held/modules/strings/strings.module.code.ts"

const MARKUP = "temper/held/Bindings.xml"

const MANIFEST = "temper/held/manifest.json"

const ART = "temper/held/art/yes.dds"

const SIDECAR = "temper/held/ids/ids.type-declaration.referenced-by.jsonl"

const PROPERTY = "akasha/referenced-by.file-property.ts"

const OLD = "SI_LCK_FOO"

const NEW = "SI_TEMPER_FOO"

const LONGER = "SI_LCK_FOOBAR"

const DECLARED_BODY = `declare const ${OLD}: number\ndeclare const ${LONGER}: number\n`

const STRINGS_BODY = `ZO_CreateStringId("${OLD}", "foo")\nZO_CreateStringId("${LONGER}", "foobar")\nlocal one = 1\nlocal two = 2\nGetString(${OLD})\n`

const MARKUP_BODY = `<Control name="${OLD}" />\n`

const MANIFEST_BODY = `{ "id": "${OLD}" }\n`

const HELD: Readonly<Record<string, string>> = {
  [DECLARED]: DECLARED_BODY,
  [STRINGS]: STRINGS_BODY,
  [MARKUP]: MARKUP_BODY,
  [MANIFEST]: MANIFEST_BODY,
}

const PAIR = [{ old: OLD, new: NEW }]

function worldHolding(held: Readonly<Record<string, string>>): World {
  const paths = Object.keys(held)
  return {
    ...worldOf(held),
    under: () => paths.filter((one) => dirname(one) === UNDER),
    claimed: () => paths.filter((one) => dirname(one) !== UNDER),
  }
}

function worldWithArt(): World {
  const world = worldHolding(HELD)
  return {
    ...world,
    claimed: () => [...(world.claimed?.(UNDER) ?? []), ART],
    bodyOf: (path) => (path === ART ? NOT_TEXT : world.bodyOf(path)),
  }
}

const GENERATING = {
  kindsUnder: (of: string) => (of === "file-property" ? ["file-property"] : []),
  everyOfType: (kind: string) => (kind === "file-property" ? [{ path: PROPERTY }] : []),
  pageByPath: (path: string) =>
    path === PROPERTY
      ? { slug: "referenced-by", propertySlug: "referenced-by", generated: true }
      : null,
  carryingOf: (named: string) =>
    named === REFERENCED_BY
      ? {
          carrying: [
            { pageTypeSlug: "type-declaration", path: DECLARED, id: "held", within: null },
          ],
        }
      : { refused: "no page property carries the slug" },
} as never

function worldWithSidecar(): World {
  const held = { ...HELD, [SIDECAR]: `{"spelling":"${OLD}"}\n` }
  return { ...worldHolding(held), index: GENERATING }
}

test("a spelling is renamed in every file under the folder, whatever kind of file that is", () => {
  const world = worldHolding(HELD)
  const said = renameSpellings(world, UNDER, PAIR)
  const left = bodiesIn(said, world.base)

  expect(said.refused).toBeNull()
  expect(left.get(DECLARED)).toBe(DECLARED_BODY.replace(OLD, NEW))
  expect(left.get(MARKUP)).toBe(MARKUP_BODY.replace(OLD, NEW))
  expect(left.get(MANIFEST)).toBe(MANIFEST_BODY.replace(OLD, NEW))
})

test("a spelling reaches both the bare declaration and the string literal", () => {
  const world = worldHolding(HELD)
  const said = renameSpellings(world, UNDER, PAIR)
  const left = bodiesIn(said, world.base).get(STRINGS) ?? ""

  expect(left).toContain(`ZO_CreateStringId("${NEW}", "foo")`)
  expect(left).toContain(`GetString(${NEW})`)
})

test("a spelling matches only at identifier boundaries", () => {
  const world = worldHolding(HELD)
  const said = renameSpellings(world, UNDER, PAIR)
  const left = bodiesIn(said, world.base)

  expect(left.get(DECLARED)).toContain(`declare const ${LONGER}: number`)
  expect(left.get(STRINGS)).toContain(`ZO_CreateStringId("${LONGER}", "foobar")`)
})

test("a spelling holding a character a pattern reads specially is matched as spelled", () => {
  expect(spelledIn("a.b").test("a.b")).toBe(true)
  expect(spelledIn("a.b").test("axb")).toBe(false)
})

test("every file's occurrences are answered in one edit per file", () => {
  const said = renameSpellings(worldHolding(HELD), UNDER, PAIR)
  const paths = said.edits.map((one) => (one.kind === "replace" ? one.path : ""))

  expect(said.edits.every((one) => one.kind === "replace")).toBe(true)
  expect(paths.filter((one) => one === STRINGS)).toHaveLength(1)
  expect([...paths].sort()).toEqual([DECLARED, MARKUP, MANIFEST, STRINGS].sort())
})

test("a body that is not text is left alone", () => {
  const said = renameSpellings(worldWithArt(), UNDER, PAIR)

  expect(said.refused).toBeNull()
  expect(said.edits.map((one) => (one.kind === "replace" ? one.path : ""))).not.toContain(ART)
})

test("a file a machine writes is left alone", () => {
  const said = renameSpellings(worldWithSidecar(), UNDER, PAIR)

  expect(said.refused).toBeNull()
  expect(said.edits.map((one) => (one.kind === "replace" ? one.path : ""))).not.toContain(SIDECAR)
})

test("a pair whose old spelling occurs nowhere under the folder refuses the whole call", () => {
  const said = renameSpellings(worldHolding(HELD), UNDER, [
    ...PAIR,
    { old: "SI_LCK_MISSING", new: "SI_TEMPER_MISSING" },
  ])

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("`SI_LCK_MISSING` occurs nowhere under `temper/held`")
})

test("a pair whose new spelling already occurs under the folder refuses the whole call", () => {
  const said = renameSpellings(worldHolding(HELD), UNDER, [{ old: OLD, new: LONGER }])

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(`\`${LONGER}\` already occurs under \`temper/held\``)
  expect(said.refused ?? "").toContain("would merge two names")
})

test("a folder holding no text is refused", () => {
  const said = renameSpellings(worldHolding({}), UNDER, PAIR)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("holds no text")
})

test("the arguments are read as a folder and one pair per line", () => {
  const world = worldHolding(HELD)
  const said = runChange(world, { under: UNDER, renames: `\n${OLD} ${NEW}\n\n` })

  expect(said.refused).toBeNull()
  expect(bodiesIn(said, world.base).get(MARKUP)).toBe(MARKUP_BODY.replace(OLD, NEW))
})

test("a line that is not two spellings parted by a space is refused", () => {
  const said = runChange(worldHolding(HELD), { under: UNDER, renames: `${OLD}\n` })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("parted by a space")
})

test("a line naming the spelling it already carries is refused", () => {
  const said = runChange(worldHolding(HELD), { under: UNDER, renames: `${OLD} ${OLD}\n` })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("already carries")
})

test("a call handing in no line is refused", () => {
  const said = runChange(worldHolding(HELD), { under: UNDER, renames: "\n\n" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("no line was handed in")
})

test("an argument the change was handed no value for is refused by its key", () => {
  expect(runChange(worldHolding(HELD), { renames: `${OLD} ${NEW}\n` }).refused ?? "").toContain(
    "`under`"
  )
  expect(runChange(worldHolding(HELD), { under: UNDER }).refused ?? "").toContain("`renames`")
})
