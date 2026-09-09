import { expect, test } from "bun:test"
import type { Value } from "@akasha/pages/page-value"
import { refusing, stating } from "../../../modules/answer/change-answer.module.code.ts"
import type { Reaching, World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { worldOf } from "../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import {
  renamePagePropertyPropertySlug,
  runChange,
} from "./rename-page-property-property-slug.change-agent.code.ts"

const CODE_AT = "akasha/code/code.file-property.ts"

const NOTE_AT = "akasha/note/note.relation-property.ts"

const MODULE_AT = "akasha/module.page-type.ts"

const ONE_AT = "akasha/one/one.module.ts"

const TWO_AT = "akasha/two/two.module.ts"

const ONE_CODE = "akasha/one/one.module.code.ts"

const ONE_CODE_TO = "akasha/one/one.module.code-file.ts"

const CHANGE_PAGE_PROPERTY = "change-mechanical-file-content/change-page-page-property"

const RENAME_KEY = "change-mechanical-file-content/rename-page-property-key"

const RENAME_SIGNATURE = "change-mechanical-file-content/rename-property-signature"

const MOVE_FILE_CODE = "change-mechanical/move-file-code"

const VALUES: Readonly<Record<string, Value>> = {
  "file-property/code": {
    id: "code-id",
    pageTypeSlug: "file-property",
    slug: "code",
    propertySlug: "code",
  },
  "relation-property/note": {
    id: "note-id",
    pageTypeSlug: "relation-property",
    slug: "note",
    propertySlug: "note",
  },
  "module/one": { id: "one", pageTypeSlug: "module", slug: "one", code: "ts", note: "module/two" },
  "module/two": { id: "two", pageTypeSlug: "module", slug: "two" },
}

const BODIES: Readonly<Record<string, string>> = { [ONE_CODE]: "export const one = 1\n" }

type Declaring = {
  readonly slug: string
  readonly kind: string
  readonly id: string
  readonly path: string
}

const BY_A_TYPE: readonly Declaring[] = [
  { slug: "module", kind: "page-type", id: "module-id", path: MODULE_AT },
]

const RECORD_AT = "akasha/i.record-property.ts"

const BY_A_RECORD: readonly Declaring[] = [
  { slug: "invariants", kind: "record-property", id: "invariants-id", path: RECORD_AT },
]

type Reached = { readonly at: string; readonly given: unknown }

function watching(reached: Reached[], refuse: string | null = null): Reaching {
  return (_world, at, given) => {
    reached.push({ at, given })
    return Promise.resolve(refuse === null ? stating([]) : refusing(refuse))
  }
}

function worldIn(
  declaring: readonly Declaring[],
  reaching: Reaching,
  values: Readonly<Record<string, Value>> = VALUES
): World {
  return {
    ...worldOf(BODIES),
    index: {
      pageByPath: (at: string) => {
        const named = (at.split("/").pop() ?? "").split(".")
        return values[`${named[1]}/${named[0]}`] ?? null
      },
      declaringOf: () => declaring,
      kindsUnder: (slug: string) => new Set([slug]),
      valuesByPath: (slug: string) =>
        new Map(
          slug === "module"
            ? ([
                [ONE_AT, values["module/one"]],
                [TWO_AT, values["module/two"]],
              ] as readonly (readonly [string, Value])[])
            : []
        ),
    } as never,
    reaching,
  }
}

function givenAt(reached: readonly Reached[], at: string): unknown {
  return reached.find((one) => one.at === at)?.given
}

test("the whole rename is composed of the four changes, in the order they are reached", async () => {
  const reached: Reached[] = []

  const said = await renamePagePropertyPropertySlug(worldIn(BY_A_TYPE, watching(reached)), {
    at: CODE_AT,
    to: "code-file",
  })

  expect(said.refused).toBeNull()
  expect(reached.map((one) => one.at)).toEqual([
    CHANGE_PAGE_PROPERTY,
    RENAME_KEY,
    RENAME_SIGNATURE,
    MOVE_FILE_CODE,
  ])
})

test("the property page's own `property-slug` is restated", async () => {
  const reached: Reached[] = []

  await renamePagePropertyPropertySlug(worldIn(BY_A_TYPE, watching(reached)), {
    at: CODE_AT,
    to: "code-file",
  })

  expect(givenAt(reached, CHANGE_PAGE_PROPERTY)).toEqual({
    at: CODE_AT,
    key: "propertySlug",
    to: "code-file",
  })
})

test("the key is spelled anew in camel on each page carrying it", async () => {
  const reached: Reached[] = []

  await renamePagePropertyPropertySlug(worldIn(BY_A_TYPE, watching(reached)), {
    at: CODE_AT,
    to: "code-file",
  })

  expect(reached.filter((one) => one.at === RENAME_KEY).map((one) => one.given)).toEqual([
    { at: ONE_AT, was: "code", now: "codeFile" },
  ])
})

const BOTH: Readonly<Record<string, Value>> = {
  ...VALUES,
  "module/two": { id: "two", pageTypeSlug: "module", slug: "two", code: "ts" },
}

test("a count handed in holds how many pages the key is spelled anew on", async () => {
  const reached: Reached[] = []

  await renamePagePropertyPropertySlug(worldIn(BY_A_TYPE, watching(reached), BOTH), {
    at: CODE_AT,
    to: "code-file",
    most: 1,
  })

  expect(reached.filter((one) => one.at === RENAME_KEY).map((one) => one.given)).toEqual([
    { at: ONE_AT, was: "code", now: "codeFile" },
  ])
})

test("a run handed a count states no slug and spells no signature anew", async () => {
  const reached: Reached[] = []

  await renamePagePropertyPropertySlug(worldIn(BY_A_TYPE, watching(reached), BOTH), {
    at: CODE_AT,
    to: "code-file",
    most: 1,
  })

  expect(reached.map((one) => one.at)).toEqual([RENAME_KEY, MOVE_FILE_CODE])
})

test("a run handed no count spells the key anew on every page carrying that key", async () => {
  const reached: Reached[] = []

  await renamePagePropertyPropertySlug(worldIn(BY_A_TYPE, watching(reached), BOTH), {
    at: CODE_AT,
    to: "code-file",
  })

  expect(reached.filter((one) => one.at === RENAME_KEY).map((one) => one.given)).toEqual([
    { at: ONE_AT, was: "code", now: "codeFile" },
    { at: TWO_AT, was: "code", now: "codeFile" },
  ])
})

test("a count that is no whole number above nothing is refused", async () => {
  const said = await runChange(worldIn(BY_A_TYPE, watching([])), {
    at: CODE_AT,
    to: "code-file",
    most: "none",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`none` is no count of pages, a count being a whole number above nothing"
  )
})

test("the member the declaring page type declares is spelled anew", async () => {
  const reached: Reached[] = []

  await renamePagePropertyPropertySlug(worldIn(BY_A_TYPE, watching(reached)), {
    at: CODE_AT,
    to: "code-file",
  })

  expect(givenAt(reached, RENAME_SIGNATURE)).toEqual({
    at: MODULE_AT,
    of: "Module.code",
    to: "codeFile",
  })
})

test("every file a file property's key names is carried to the new name", async () => {
  const reached: Reached[] = []

  await renamePagePropertyPropertySlug(worldIn(BY_A_TYPE, watching(reached)), {
    at: CODE_AT,
    to: "code-file",
  })

  expect(givenAt(reached, MOVE_FILE_CODE)).toEqual({ from: ONE_CODE, to: ONE_CODE_TO })
})

test("a property that is no file property carries no file", async () => {
  const reached: Reached[] = []

  const said = await renamePagePropertyPropertySlug(worldIn(BY_A_TYPE, watching(reached)), {
    at: NOTE_AT,
    to: "held",
  })

  expect(said.refused).toBeNull()
  expect(reached.map((one) => one.at)).not.toContain(MOVE_FILE_CODE)
})

const RECORD_VALUES: Readonly<Record<string, Value>> = {
  ...VALUES,
  "record-property/i": {
    id: "invariants-id",
    pageTypeSlug: "record-property",
    slug: "i",
    propertySlug: "invariants",
  },
  "module/one": { id: "one", pageTypeSlug: "module", slug: "one", invariants: [{ code: "ts" }] },
}

function worldOfRecords(reaching: Reaching): World {
  const world = worldIn(BY_A_RECORD, reaching, RECORD_VALUES)
  return {
    ...world,
    index: {
      ...world.index,
      declaringOf: (id: string) => (id === "invariants-id" ? BY_A_TYPE : BY_A_RECORD),
    } as never,
  }
}

test("a record declaring the property has its key spelled anew in each record", async () => {
  const reached: Reached[] = []

  const said = await renamePagePropertyPropertySlug(worldOfRecords(watching(reached)), {
    at: CODE_AT,
    to: "code-file",
  })

  expect(said.refused).toBeNull()
  expect(givenAt(reached, RENAME_KEY)).toEqual({
    at: ONE_AT,
    was: "code",
    now: "codeFile",
    within: "invariants",
  })
})

test("the field the record's own type declares is spelled anew beside the key", async () => {
  const reached: Reached[] = []

  await renamePagePropertyPropertySlug(worldOfRecords(watching(reached)), {
    at: CODE_AT,
    to: "code-file",
  })

  expect(givenAt(reached, RENAME_SIGNATURE)).toEqual({
    at: RECORD_AT,
    of: "*.code",
    to: "codeFile",
  })
})

test("the property slug the page already carries is refused", async () => {
  const said = await renamePagePropertyPropertySlug(worldIn(BY_A_TYPE, watching([])), {
    at: CODE_AT,
    to: "code",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe("`code` is the property slug that page already carries")
})

const STATED: Readonly<Record<string, Value>> = {
  ...VALUES,
  "file-property/code": {
    id: "code-id",
    pageTypeSlug: "file-property",
    slug: "code",
    propertySlug: "code-file",
  },
}

test("a former key handed in is spelled anew though the page states its new slug", async () => {
  const reached: Reached[] = []

  const said = await renamePagePropertyPropertySlug(worldIn(BY_A_TYPE, watching(reached), STATED), {
    at: CODE_AT,
    to: "code-file",
    was: "code",
  })

  expect(said.refused).toBeNull()
  expect(reached.map((one) => one.at)).toEqual([RENAME_KEY, MOVE_FILE_CODE])
  expect(givenAt(reached, RENAME_KEY)).toEqual({ at: ONE_AT, was: "code", now: "codeFile" })
})

test("a former key that is the slug the page carries is refused", async () => {
  const said = await renamePagePropertyPropertySlug(worldIn(BY_A_TYPE, watching([]), STATED), {
    at: CODE_AT,
    to: "code-file",
    was: "code-file",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`code-file` is the slug handed in and the slug that page carries, so no key changes"
  )
})

test("a slug that is not lower kebab case is refused", async () => {
  const said = await renamePagePropertyPropertySlug(worldIn(BY_A_TYPE, watching([])), {
    at: CODE_AT,
    to: "codeFile",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`codeFile` is no property slug, a property slug being lower kebab case"
  )
})

test("a page stating no `property-slug` is refused", async () => {
  const said = await renamePagePropertyPropertySlug(worldIn(BY_A_TYPE, watching([])), {
    at: ONE_AT,
    to: "held",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`akasha/one/one.module.ts` states no `property-slug`, so that page carries no key"
  )
})

test("a path the index files no page at is refused", async () => {
  const said = await renamePagePropertyPropertySlug(worldIn(BY_A_TYPE, watching([])), {
    at: "akasha/gone/gone.file-property.ts",
    to: "held",
  })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`akasha/gone/gone.file-property.ts` names no page, so no key is spelled anew"
  )
})

test("one page refused refuses the whole change, and the refusal names that page", async () => {
  const reached: Reached[] = []
  const world = worldIn(BY_A_TYPE, (over, at, given) => {
    reached.push({ at, given })
    return at === RENAME_KEY
      ? Promise.resolve(refusing("that key is spelled otherwise"))
      : watching([])(over, at, given)
  })

  const said = await renamePagePropertyPropertySlug(world, { at: CODE_AT, to: "code-file" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    "`akasha/one/one.module.ts` is refused, and that key is spelled otherwise"
  )
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(worldIn(BY_A_TYPE, watching([])), { at: CODE_AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`to` names what this change is handed/)
})

const RENAME_ENTRY_KEY = "change-mechanical-file-content/rename-entry-key"

const ENTRY_AT = "akasha/months/transactions.page-property-entry.ts"

const MONTH_AT = "akasha/months/one.month.ts"

const ROWS_AT = "akasha/months/one.month.transactions.jsonl"

const BY_A_SHAPE: readonly Declaring[] = [
  { slug: "transactions", kind: "page-property-entry", id: "transactions-id", path: ENTRY_AT },
]

const BY_A_MONTH: readonly Declaring[] = [
  { slug: "month", kind: "page-type", id: "month-id", path: "akasha/month.page-type.ts" },
]

const ENTRY_VALUES: Readonly<Record<string, Value>> = {
  ...VALUES,
  "page-property-entry/transactions": {
    id: "transactions-id",
    pageTypeSlug: "page-property-entry",
    slug: "transactions",
    propertySlug: "transactions",
  },
  "month/one": { id: "month-one", pageTypeSlug: "month", slug: "one", transactions: "jsonl" },
}

function worldOfEntries(reaching: Reaching): World {
  return {
    ...worldOf({ [ROWS_AT]: '{"id":"a","code":"ts"}\n' }),
    index: {
      pageByPath: (at: string) => {
        const named = (at.split("/").pop() ?? "").split(".")
        return ENTRY_VALUES[`${named[1]}/${named[0]}`] ?? null
      },
      declaringOf: (id: string) => (id === "transactions-id" ? BY_A_MONTH : BY_A_SHAPE),
      kindsUnder: (slug: string) => new Set([slug]),
      valuesByPath: (slug: string) =>
        new Map(
          slug === "month"
            ? ([[MONTH_AT, ENTRY_VALUES["month/one"]]] as readonly (readonly [string, Value])[])
            : []
        ),
    } as never,
    reaching,
  }
}

test("an entry shape declaring the property has the key spelled anew beside each page", async () => {
  const reached: Reached[] = []

  const said = await renamePagePropertyPropertySlug(worldOfEntries(watching(reached)), {
    at: CODE_AT,
    to: "code-file",
  })

  expect(said.refused).toBeNull()
  expect(givenAt(reached, RENAME_ENTRY_KEY)).toEqual({ at: ROWS_AT, was: "code", now: "codeFile" })
})

test("a run handed a count spells no key anew in a file of entries", async () => {
  const reached: Reached[] = []

  await renamePagePropertyPropertySlug(worldOfEntries(watching(reached)), {
    at: CODE_AT,
    to: "code-file",
    most: 1,
  })

  expect(reached.map((one) => one.at)).not.toContain(RENAME_ENTRY_KEY)
})

test("one file of entries refused refuses the whole change", async () => {
  const world = worldOfEntries((over, at, given) =>
    at === RENAME_ENTRY_KEY
      ? Promise.resolve(refusing("that key is spelled otherwise"))
      : watching([])(over, at, given)
  )

  const said = await renamePagePropertyPropertySlug(world, { at: CODE_AT, to: "code-file" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${ROWS_AT}\` is refused, and that key is spelled otherwise`)
})
