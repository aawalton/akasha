import { expect, test } from "bun:test"
import { splicedIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  entrySpotted,
  keySpotted,
  type Spotted,
  slugSpotted,
} from "akasha/change/modules/page-property-renaming/page-property-renaming.module.code.ts"
import { bodiesIn } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const PAGE_AT = "akasha/wold/wold.file-property.ts"

const PAGE_BODY = `export const wold = {
  id: "held",
  type: "file-property",
  slug: "wold",
  propertySlug: "wold",
} as const
`

const HOLDER_AT = "akasha/quoin/quoin.module.ts"

const HOLDER_BODY = `export const quoin = {
  id: "kept",
  pageTypeSlug: "module",
  slug: "quoin",
  wold: "ts",
  tallies: [{ wold: "ts" }, { slug: "one" }],
} as const
`

const ENTRIES_AT = "akasha/quoin/quoin.module.tallies.jsonl"

const ENTRIES_BODY = '{"id":"a","wold":"ts"}\n{"id":"b"}\n'

const CODE_AT = "akasha/quoin/quoin.module.code.ts"

function bodyOver(path: string, text: string, held: Spotted): string {
  expect(held).not.toHaveProperty("refused")
  if ("refused" in held) return ""
  const edits = splicedIn(path, text, [...held.spots])
  return bodiesIn({ edits, refused: null }, () => text).get(path) ?? ""
}

function refusalOf(held: Spotted): string {
  expect(held).toHaveProperty("refused")
  return "refused" in held ? held.refused : ""
}

test("the slug the property's page states is answered as the text under the key", () => {
  const held = slugSpotted(PAGE_AT, PAGE_BODY, "propertySlug", "wold-file")

  expect(bodyOver(PAGE_AT, PAGE_BODY, held)).toContain('propertySlug: "wold-file"')
})

test("a body stating no text under that key is refused", () => {
  expect(refusalOf(slugSpotted(PAGE_AT, PAGE_BODY, "held", "wold-file"))).toBe(
    `\`${PAGE_AT}\` states no text under \`held\``
  )
})

test("a body already stating the slug asked for is refused", () => {
  expect(refusalOf(slugSpotted(PAGE_AT, PAGE_BODY, "propertySlug", "wold"))).toBe(
    "`wold` is what `propertySlug` states already"
  )
})

test("the key of the exported object is respelled where no holding key is named", () => {
  const held = keySpotted(HOLDER_AT, HOLDER_BODY, "wold", "woldFile", null)

  expect(bodyOver(HOLDER_AT, HOLDER_BODY, held)).toContain('woldFile: "ts"')
})

test("a key spelled as a string is respelled as a string", () => {
  const text = HOLDER_BODY.replace("wold:", '"wold":')

  expect(
    bodyOver(HOLDER_AT, text, keySpotted(HOLDER_AT, text, "wold", "woldFile", null))
  ).toContain('"woldFile": "ts"')
})

test("a holding key named respells the key in each record that key states", () => {
  const held = keySpotted(HOLDER_AT, HOLDER_BODY, "wold", "woldFile", "tallies")

  expect(bodyOver(HOLDER_AT, HOLDER_BODY, held)).toContain('[{ woldFile: "ts" }, { slug: "one" }]')
})

test("a record stating no such key is passed over", () => {
  const held = keySpotted(HOLDER_AT, HOLDER_BODY, "slug", "named", "tallies")

  expect(bodyOver(HOLDER_AT, HOLDER_BODY, held)).toContain('{ named: "one" }')
})

test("a body already stating the key asked for is refused", () => {
  expect(refusalOf(keySpotted(HOLDER_AT, HOLDER_BODY, "wold", "slug", null))).toBe(
    `\`${HOLDER_AT}\` states \`slug\` already`
  )
})

test("a body stating that key nowhere is refused where no holding key is named", () => {
  expect(refusalOf(keySpotted(HOLDER_AT, HOLDER_BODY, "held", "kept", null))).toBe(
    `\`${HOLDER_AT}\` states no \`held\``
  )
})

test("a body exporting no object is refused", () => {
  expect(refusalOf(keySpotted(CODE_AT, "export const quoin = 1\n", "wold", "woldFile", null))).toBe(
    `\`${CODE_AT}\` exports no object`
  )
})

test("every entry stating that key has the key respelled in one passage", () => {
  const held = entrySpotted(ENTRIES_AT, ENTRIES_BODY, "wold", "woldFile")

  expect("refused" in held ? [] : held.spots).toHaveLength(1)
  expect(bodyOver(ENTRIES_AT, ENTRIES_BODY, held)).toBe('{"id":"a","woldFile":"ts"}\n{"id":"b"}\n')
})

test("a key inside a value an entry states is left as that key is", () => {
  const text = '{"id":"a","note":{"wold":"inner"},"wold":"ts"}\n'

  expect(bodyOver(ENTRIES_AT, text, entrySpotted(ENTRIES_AT, text, "wold", "woldFile"))).toContain(
    '"note":{"wold":"inner"}'
  )
})

test("an entry stating both that key and the key asked for is refused", () => {
  expect(refusalOf(entrySpotted(ENTRIES_AT, ENTRIES_BODY, "wold", "id"))).toBe(
    `\`${ENTRIES_AT}\` states \`wold\` and \`id\` in one entry`
  )
})

test("an entry stating the key asked for and not that key is passed over", () => {
  const text = '{"id":"a","wold":"ts"}\n{"id":"b","woldFile":"ts"}\n'

  expect(bodyOver(ENTRIES_AT, text, entrySpotted(ENTRIES_AT, text, "wold", "woldFile"))).toBe(
    '{"id":"a","woldFile":"ts"}\n{"id":"b","woldFile":"ts"}\n'
  )
})

test("a body that is no run of entries is refused", () => {
  expect(refusalOf(entrySpotted(ENTRIES_AT, "{\n", "wold", "woldFile"))).toContain(
    "reads as no run of entries"
  )
})
