import { expect, test } from "bun:test"
import { renamePagePropertyPropertySlug } from "akasha/change/mechanical/page-property/rename-page-property-property-slug/rename-page-property-property-slug.change-mechanical.code.ts"
import {
  type Answer,
  pathsIn,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type Reaching,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { worldOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const WOLD_AT = "akasha/wold/wold.file-property.ts"

const NOTE_AT = "akasha/note/note.relation-property.ts"

const TYPE_AT = "akasha/quoin.page-type.ts"

const TYPES_AT = "akasha/quoin.page-type.types.ts"

const ONE_AT = "akasha/one/one.quoin.ts"

const TWO_AT = "akasha/two/two.quoin.ts"

const ONE_FILE = "akasha/one/one.quoin.wold.ts"

const ONE_FILE_TO = "akasha/one/one.quoin.wold-file.ts"

const RECORD_AT = "akasha/i.record-property.ts"

const ENTRY_AT = "akasha/months/tallies.page-property-entry.ts"

const MONTH_AT = "akasha/months/one.month.ts"

const ROWS_AT = "akasha/months/one.month.tallies.jsonl"

const WOLD_BODY = `export const wold = {
  id: "wold-id",
  type: "file-property",
  slug: "wold",
  propertySlug: "wold",
} as const
`

const NOTE_BODY = `export const note = {
  id: "note-id",
  type: "relation-property",
  slug: "note",
  propertySlug: "note",
} as const
`

const ONE_BODY = `export const one = {
  id: "one",
  pageTypeSlug: "quoin",
  slug: "one",
  wold: "ts",
  note: "quoin/two",
} as const
`

const TWO_BODY = `export const two = {
  id: "two",
  pageTypeSlug: "quoin",
  slug: "two",
  wold: "ts",
} as const
`

const TYPES_BODY = "export type Quoin = { wold: string; note: string }\n"

const BODIES: Readonly<Record<string, string>> = {
  [WOLD_AT]: WOLD_BODY,
  [NOTE_AT]: NOTE_BODY,
  [TYPES_AT]: TYPES_BODY,
  [ONE_AT]: ONE_BODY,
  [TWO_AT]: TWO_BODY,
  [ONE_FILE]: "export const one = 1\n",
}

const VALUES: Readonly<Record<string, Value>> = {
  "file-property/wold": {
    id: "wold-id",
    pageTypeSlug: "file-property",
    slug: "wold",
    propertySlug: "wold",
  },
  "relation-property/note": {
    id: "note-id",
    pageTypeSlug: "relation-property",
    slug: "note",
    propertySlug: "note",
  },
  "page-type/quoin": { id: "quoin-id", pageTypeSlug: "page-type", slug: "quoin", types: "ts" },
  "quoin/one": { id: "one", pageTypeSlug: "quoin", slug: "one", wold: "ts", note: "quoin/two" },
  "quoin/two": { id: "two", pageTypeSlug: "quoin", slug: "two", wold: "ts" },
}

type Declaring = {
  readonly slug: string
  readonly kind: string
  readonly id: string
  readonly path: string
}

const BY_A_TYPE: readonly Declaring[] = [
  { slug: "quoin", kind: "page-type", id: "quoin-id", path: TYPE_AT },
]

const BY_A_RECORD: readonly Declaring[] = [
  { slug: "tallies", kind: "record-property", id: "tallies-id", path: RECORD_AT },
]

const REACHED: string[] = []

const reaches: Reaching = (_world, at) => {
  REACHED.push(at)
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

function worldIn(
  bodies: Readonly<Record<string, string>>,
  values: Readonly<Record<string, Value>>,
  declaring: (id: string) => readonly Declaring[],
  paged: Readonly<Record<string, readonly (readonly [string, Value])[]>>
): World {
  return {
    ...worldOf(bodies),
    index: {
      pageByPath: (at: string) => {
        const named = (at.split("/").pop() ?? "").split(".")
        return values[`${named[1]}/${named[0]}`] ?? null
      },
      declaringOf: declaring,
      kindsUnder: (slug: string) => new Set([slug]),
      valuesByPath: (slug: string) => new Map(paged[slug] ?? []),
      importersOf: () => [],
      everyPath: () => Object.keys(bodies),
      fileKeysAt: () => new Map<string, string | null>(),
    } as never,
    reaching: reaches,
  }
}

const PAGED: Readonly<Record<string, readonly (readonly [string, Value])[]>> = {
  quoin: [
    [ONE_AT, VALUES["quoin/one"] as Value],
    [TWO_AT, VALUES["quoin/two"] as Value],
  ],
}

function typedWorld(
  bodies: Readonly<Record<string, string>> = BODIES,
  values: Readonly<Record<string, Value>> = VALUES
): World {
  return worldIn(bodies, values, () => BY_A_TYPE, PAGED)
}

function bodyOf(said: Answer, world: World, at: string): string {
  expect(said.refused).toBeNull()
  return bodiesIn(said, world.base).get(at) ?? ""
}

test("the property page's own slug is restated", () => {
  const world = typedWorld()

  const said = renamePagePropertyPropertySlug(world, { at: WOLD_AT, to: "wold-file" })

  expect(bodyOf(said, world, WOLD_AT)).toContain('propertySlug: "wold-file"')
})

test("the key is spelled anew in camel on each page carrying it", () => {
  const world = typedWorld()

  const said = renamePagePropertyPropertySlug(world, { at: WOLD_AT, to: "wold-file" })

  expect(bodyOf(said, world, ONE_AT)).toContain('woldFile: "ts"')
  expect(bodyOf(said, world, TWO_AT)).toContain('woldFile: "ts"')
})

test("the member the declaring page type declares is spelled anew", () => {
  const world = typedWorld()

  const said = renamePagePropertyPropertySlug(world, { at: WOLD_AT, to: "wold-file" })

  expect(bodyOf(said, world, TYPES_AT)).toContain("woldFile: string")
})

test("every file a file property's key names is carried to the new name", () => {
  const said = renamePagePropertyPropertySlug(typedWorld(), { at: WOLD_AT, to: "wold-file" })

  expect(said.refused).toBeNull()
  expect(said.edits).toContainEqual({ kind: "move", pathFrom: ONE_FILE, pathTo: ONE_FILE_TO })
})

test("a count handed in holds how many pages the key is spelled anew on", () => {
  const said = renamePagePropertyPropertySlug(typedWorld(), {
    at: WOLD_AT,
    to: "wold-file",
    atMost: 1,
  })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toContain(ONE_AT)
  expect(pathsIn(said)).not.toContain(TWO_AT)
})

test("a run handed a count states no slug and spells no signature anew", () => {
  const said = renamePagePropertyPropertySlug(typedWorld(), {
    at: WOLD_AT,
    to: "wold-file",
    atMost: 1,
  })

  expect(pathsIn(said)).not.toContain(WOLD_AT)
  expect(pathsIn(said)).not.toContain(TYPES_AT)
})

test("a property that is no file property carries no file", () => {
  const said = renamePagePropertyPropertySlug(typedWorld(), { at: NOTE_AT, to: "held" })

  expect(said.refused).toBeNull()
  expect(said.edits.some((one) => one.kind === "move")).toBe(false)
})

const STATED: Readonly<Record<string, Value>> = {
  ...VALUES,
  "file-property/wold": {
    id: "wold-id",
    pageTypeSlug: "file-property",
    slug: "wold",
    propertySlug: "wold-file",
  },
}

const STATED_BODIES: Readonly<Record<string, string>> = {
  ...BODIES,
  [WOLD_AT]: WOLD_BODY.replace('propertySlug: "wold"', 'propertySlug: "wold-file"'),
}

test("a former key handed in is spelled anew though the page states its new slug", () => {
  const world = typedWorld(STATED_BODIES, STATED)

  const said = renamePagePropertyPropertySlug(world, {
    at: WOLD_AT,
    to: "wold-file",
    was: "wold",
  })

  expect(bodyOf(said, world, ONE_AT)).toContain('woldFile: "ts"')
  expect(pathsIn(said)).not.toContain(WOLD_AT)
  expect(pathsIn(said)).not.toContain(TYPES_AT)
})

test("the property slug the page already carries is refused", () => {
  const said = renamePagePropertyPropertySlug(typedWorld(), { at: WOLD_AT, to: "wold" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`wold` is the property slug that page already carries")
})

test("a former key that is the slug the page carries is refused", () => {
  const said = renamePagePropertyPropertySlug(typedWorld(STATED_BODIES, STATED), {
    at: WOLD_AT,
    to: "wold-file",
    was: "wold-file",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`wold-file` is the slug handed in and the slug that page carries, so no key changes"
  )
})

test("a slug that is not lower kebab case is refused", () => {
  const said = renamePagePropertyPropertySlug(typedWorld(), { at: WOLD_AT, to: "woldFile" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`woldFile` is no property slug, a property slug being lower kebab case"
  )
})

test("a page stating no property slug is refused", () => {
  const said = renamePagePropertyPropertySlug(typedWorld(), { at: ONE_AT, to: "held" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${ONE_AT}\` states no \`property-slug\`, so that page carries no key`
  )
})

test("a path the index files no page at is refused", () => {
  const said = renamePagePropertyPropertySlug(typedWorld(), {
    at: "akasha/gone/gone.file-property.ts",
    to: "held",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`akasha/gone/gone.file-property.ts` names no page, so no key is spelled anew"
  )
})

test("a property no page type or record or entry shape declares is refused", () => {
  const said = renamePagePropertyPropertySlug(
    worldIn(BODIES, VALUES, () => [], PAGED),
    {
      at: WOLD_AT,
      to: "wold-file",
    }
  )

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("is declared by no page type")
})

const RECORD_VALUES: Readonly<Record<string, Value>> = {
  ...VALUES,
  "record-property/i": {
    id: "tallies-id",
    pageTypeSlug: "record-property",
    slug: "i",
    propertySlug: "tallies",
  },
  "quoin/one": { id: "one", pageTypeSlug: "quoin", slug: "one", tallies: [{ wold: "ts" }] },
}

const RECORD_BODIES: Readonly<Record<string, string>> = {
  [WOLD_AT]: WOLD_BODY,
  [RECORD_AT]: "export type Tallies = { wold: string }\n",
  [ONE_AT]: `export const one = {
  id: "one",
  pageTypeSlug: "quoin",
  slug: "one",
  tallies: [{ wold: "ts" }],
} as const
`,
}

function recordWorld(): World {
  return worldIn(
    RECORD_BODIES,
    RECORD_VALUES,
    (id: string) => (id === "tallies-id" ? BY_A_TYPE : BY_A_RECORD),
    { quoin: [[ONE_AT, RECORD_VALUES["quoin/one"] as Value]] }
  )
}

test("a record declaring the property has its key spelled anew in each record", () => {
  const world = recordWorld()

  const said = renamePagePropertyPropertySlug(world, { at: WOLD_AT, to: "wold-file" })

  expect(bodyOf(said, world, ONE_AT)).toContain('tallies: [{ woldFile: "ts" }]')
})

test("the field the record's own type declares is spelled anew beside the key", () => {
  const world = recordWorld()

  const said = renamePagePropertyPropertySlug(world, { at: WOLD_AT, to: "wold-file" })

  expect(bodyOf(said, world, RECORD_AT)).toContain("woldFile: string")
})

const ENTRY_VALUES: Readonly<Record<string, Value>> = {
  ...VALUES,
  "page-property-entry/tallies": {
    id: "tallies-id",
    pageTypeSlug: "page-property-entry",
    slug: "tallies",
    propertySlug: "tallies",
  },
  "month/one": { id: "month-one", pageTypeSlug: "month", slug: "one", tallies: "jsonl" },
}

const BY_A_SHAPE: readonly Declaring[] = [
  { slug: "tallies", kind: "page-property-entry", id: "tallies-id", path: ENTRY_AT },
]

const BY_A_MONTH: readonly Declaring[] = [
  { slug: "month", kind: "page-type", id: "month-id", path: "akasha/month.page-type.ts" },
]

function entryWorld(): World {
  return worldIn(
    { [WOLD_AT]: WOLD_BODY, [ROWS_AT]: '{"id":"a","wold":"ts"}\n' },
    ENTRY_VALUES,
    (id: string) => (id === "tallies-id" ? BY_A_MONTH : BY_A_SHAPE),
    { month: [[MONTH_AT, ENTRY_VALUES["month/one"] as Value]] }
  )
}

test("an entry shape declaring the property has the key spelled anew beside each page", () => {
  const world = entryWorld()

  const said = renamePagePropertyPropertySlug(world, { at: WOLD_AT, to: "wold-file" })

  expect(bodyOf(said, world, ROWS_AT)).toBe('{"id":"a","woldFile":"ts"}\n')
})

test("a run handed a count spells no key anew in a file of entries", () => {
  const said = renamePagePropertyPropertySlug(entryWorld(), {
    at: WOLD_AT,
    to: "wold-file",
    atMost: 1,
  })

  expect(pathsIn(said)).not.toContain(ROWS_AT)
})

test("no rung beneath is reached", () => {
  REACHED.length = 0

  const said = renamePagePropertyPropertySlug(typedWorld(), { at: WOLD_AT, to: "wold-file" })

  expect(said.refused).toBeNull()
  expect(REACHED).toEqual([])
})
