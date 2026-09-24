import { expect, test } from "bun:test"
import {
  changePropertyRecordField,
  runChange,
} from "akasha/change/agent/file-content/change-property-record-field/change-property-record-field.change-agent.code.ts"
import { changePropertyRecordField as changePropertyRecordFieldMechanical } from "akasha/change/mechanical/file-content/change/change-property-record-field/change-property-record-field.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  bodyOf,
  knownOf,
  worldFor,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ADDRESS =
  `${changeMechanicalFileContent.slug}/${changePropertyRecordFieldMechanical.slug}` as const

const AT = "change/modules/held/held.module.ts"

const ID = "01a072c8-f35d-7ffc-afc3-75b72460b059"

const BODY = `import type { Module } from "@akasha/code/module"

export const held = {
  id: "${ID}",
  pageTypeSlug: "module",
  slug: "held",
  code: "ts",
  decisions: [
    {
      decisionKind: "departure",
      statement: "the first",
    },
  ],
} as const satisfies Module
`

const PAGE = { id: ID, pageTypeSlug: "module", slug: "held" } as Value

function worldTold(): World {
  return worldFor(PAGE, BODY, running)
}

function worldDeclaring(fields: readonly string[]): World {
  const known = knownOf({
    admitting: (one) => [one],
    slugOfKeyIn: (_value, key) => (key === "decisions" ? "decisions" : null),
    fieldOfKey: (_record, key) => (fields.includes(key) ? key : null),
  })
  const index = {
    knownIn: () => known,
    pageByPath: () => PAGE,
    valuesByPath: () => new Map(),
    kindsUnder: () => new Set<string>(),
    pageAt: () => null,
  }
  return { ...worldTold(), index: index as never }
}

const TYPE_BODY = `import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const held = {
  id: "${ID}",
  type: "page-type/kept-type",
  slug: "held",
  properties: [{ pageProperty: "text-property/kept-titles", required: false, many: false }],
} as const satisfies PageType
`

const TYPE_PAGE = { id: ID, type: "page-type/kept-type", slug: "held" } as Value

function worldTyped(): World {
  const known = knownOf({
    admitting: (one) => [one],
    slugOfKeyIn: (_value, key) => (key === "properties" ? "properties" : null),
    fieldOfKey: (_record, key) => (key === "required" ? "required" : null),
  })
  const index = {
    knownIn: () => known,
    pageByPath: () => TYPE_PAGE,
    valuesByPath: () => new Map(),
    kindsUnder: (kind: string) => new Set([kind]),
    pageAt: (kind: string, slug: string) =>
      kind === "boolean-property" && slug === "required" ? TYPE_PAGE : null,
  }
  return { ...worldFor(TYPE_PAGE, TYPE_BODY, running), index: index as never }
}

test("a field whose property is a boolean property is restated as a boolean", async () => {
  const asked = {
    at: "page/held/held.page-type.ts",
    key: "properties",
    where: "pageProperty",
    is: "text-property/kept-titles",
    field: "required",
    to: "true",
  }

  const said = await changePropertyRecordField(worldTyped(), asked)

  expect(bodyOf(said, () => TYPE_BODY)).toBe(TYPE_BODY.replace("required: false", "required: true"))
})

const ASKED = {
  at: AT,
  key: "decisions",
  where: "statement",
  is: "the first",
  field: "decisionKind",
  to: "gap",
}

test("one field of the record a match names is stated anew", async () => {
  const said = await changePropertyRecordField(worldTold(), ASKED)

  expect(said.refused).toBeNull()
  expect(bodyOf(said, () => BODY)).toContain(`decisionKind: "gap"`)
})

test("a declared field the record does not state is added to that record", async () => {
  const asked = { ...ASKED, field: "workingMemory", to: "what it holds" }

  const said = await changePropertyRecordField(worldDeclaring(["workingMemory"]), asked)

  expect(said.refused).toBeNull()
  expect(bodyOf(said, () => BODY)).toBe(
    BODY.replace(
      `      statement: "the first",\n`,
      `      statement: "the first",\n      workingMemory: "what it holds",\n`
    )
  )
})

test("a field the record does not state is refused where its record property does not declare it", async () => {
  const asked = { ...ASKED, field: "workingMemory", to: "what it holds" }

  const said = await changePropertyRecordField(worldDeclaring([]), asked)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("that record states nothing under `workingMemory`")
})

test("a declared field the record states already is stated anew rather than added", async () => {
  const said = await changePropertyRecordField(worldDeclaring(["decisionKind"]), ASKED)

  expect(said.refused).toBeNull()
  expect(bodyOf(said, () => BODY)).toBe(BODY.replace(`"departure"`, `"gap"`))
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(worldTold(), { at: AT, key: "decisions" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`where` names what this change is handed/)
})

test("the arguments are handed to the change reached at the address that change names", async () => {
  const reached: string[] = []
  const seeing: World = {
    ...worldTold(),
    reaching: (_world, at) => {
      reached.push(at)
      return Promise.resolve(NOTHING_OVER)
    },
  }

  await changePropertyRecordField(seeing, ASKED)

  expect(reached).toEqual([ADDRESS])
})

test("nothing here works out a body of its own", async () => {
  const seeing: World = {
    ...worldTold(),
    reaching: () => Promise.resolve(NOTHING_OVER),
  }

  const said = await changePropertyRecordField(seeing, ASKED)

  expect(said.edits).toEqual([])
})
