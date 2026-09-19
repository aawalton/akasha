import { expect, test } from "bun:test"
import {
  addPropertyRecord,
  runChange,
} from "akasha/change/agent/file-content/add-property-record/add-property-record.change-agent.code.ts"
import { addPropertyRecord as addPropertyRecordMechanical } from "akasha/change/mechanical/file-content/add/add-property-record/add-property-record.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  bodyOf,
  worldFor,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ADDRESS = `${changeMechanicalFileContent.slug}/${addPropertyRecordMechanical.slug}` as const

const AT = "change/modules/held/held.module.ts"

const ID = "01a072c8-f35d-7ffc-afc3-75b72460b059"

const BODY = `import type { Module } from "@akasha/code/module"

export const held = {
  id: "${ID}",
  pageTypeSlug: "module",
  slug: "held",
  code: "ts",
  decisions: [
    { decisionKind: "departure", statement: "the first" },
  ],
} as const satisfies Module
`

const PAGE = { id: ID, pageTypeSlug: "module", slug: "held" } as Value

function worldTold(): World {
  return worldFor(PAGE, BODY, running)
}

const RECORD = '{ decisionKind: "gap", statement: "the second" }'

test("a record is put in as the body spells it rather than quoted", async () => {
  const said = await addPropertyRecord(worldTold(), {
    at: AT,
    key: "decisions",
    record: RECORD,
  })

  expect(said.refused).toBeNull()
  expect(bodyOf(said, () => BODY)).toContain(RECORD)
})

test("text parsing as no record is refused", async () => {
  const said = await addPropertyRecord(worldTold(), {
    at: AT,
    key: "decisions",
    record: "the second",
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/parses as no record/)
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(worldTold(), { at: AT, key: "decisions" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`record` names what this change is handed/)
})

test("the record is handed to the change reached at the address that change names", async () => {
  const reached: string[] = []
  const seeing: World = {
    ...worldTold(),
    reaching: (_world, at) => {
      reached.push(at)
      return Promise.resolve(NOTHING_OVER)
    },
  }

  await addPropertyRecord(seeing, { at: AT, key: "decisions", record: RECORD })

  expect(reached).toEqual([ADDRESS])
})

test("`after` is left out where the pages of this page's type write the key nowhere", async () => {
  let handed: unknown = null
  const seeing: World = {
    ...worldTold(),
    reaching: (_world, _at, given) => {
      handed = given
      return Promise.resolve(NOTHING_OVER)
    },
  }

  await runChange(seeing, { at: AT, key: "decisions", record: RECORD })

  expect(handed).toEqual({ at: AT, key: "decisions", record: RECORD })
})

const SIBLINGS = new Map<string, Value>([
  [
    "change/modules/other/other.module.ts",
    {
      id: "01a072c8-f35d-7ffc-afc3-75b72460b060",
      pageTypeSlug: "module",
      slug: "other",
      directives: [],
      code: "ts",
    },
  ],
])

test("the key the pages of this page's type write it after is handed on", async () => {
  let handed: unknown = null
  const seeing: World = {
    ...worldFor(PAGE, BODY, running, SIBLINGS),
    reaching: (_world, _at, given) => {
      handed = given
      return Promise.resolve(NOTHING_OVER)
    },
  }

  await runChange(seeing, { at: AT, key: "directives", record: RECORD })

  expect(handed).toEqual({ at: AT, key: "directives", record: RECORD, after: "slug" })
})

test("`after` is handed on where the caller states `after`", async () => {
  let handed: unknown = null
  const seeing: World = {
    ...worldTold(),
    reaching: (_world, _at, given) => {
      handed = given
      return Promise.resolve(NOTHING_OVER)
    },
  }

  await runChange(seeing, { at: AT, key: "decisions", record: RECORD, after: "code" })

  expect(handed).toEqual({ at: AT, key: "decisions", record: RECORD, after: "code" })
})
