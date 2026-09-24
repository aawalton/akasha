import { expect, test } from "bun:test"
import {
  removePropertyValue,
  runChange,
} from "akasha/change/agent/file-content/remove-property-value/remove-property-value.change-agent.code.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { removePropertyValue as removePropertyValueMechanical } from "akasha/change/mechanical/file-content/remove/remove-property-value/remove-property-value.change-mechanical-file-content.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { knownOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const AT = "held/held.domain.ts"

const ID = "01a072c8-f35d-7ffc-afc3-75b72460b059"

const PAGE = { id: ID, pageTypeSlug: "domain", slug: "held" } as Value

const RUNS = `${changeMechanicalFileContent.slug}/${removePropertyValueMechanical.slug}` as const

function worldWith(page: Value | null): World {
  const known = knownOf({})
  return {
    root: "/nowhere",
    index: { knownIn: () => known, pageByPath: () => page } as never,
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
  }
}

const ASKED = { at: AT, key: "partSlugs", value: "command/one" }

test("the value is handed to the mechanical change of the same name", async () => {
  let reached = ""

  const said = await removePropertyValue(
    {
      ...worldWith(PAGE),
      reaching: (_world, at) => {
        reached = at
        return Promise.resolve(NOTHING_OVER)
      },
    },
    ASKED
  )

  expect(reached).toBe(RUNS)
  expect(said.refused).toBeNull()
})

test("a value naming no page is handed on as any other value is", async () => {
  let reached = ""

  await removePropertyValue(
    {
      ...worldWith(PAGE),
      reaching: (_world, at) => {
        reached = at
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { ...ASKED, value: "command/nowhere" }
  )

  expect(reached).toBe(RUNS)
})

test("a path the world names no page at is refused", async () => {
  const said = await removePropertyValue(worldWith(null), ASKED)

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/names no page/)
})

const IN_RECORD = { at: AT, key: "directives", where: "name", is: "One", field: "aids" }

function recordWorld(many: boolean, seen: { given: unknown }): World {
  const known = knownOf({ slugOfKeyIn: () => "directives" })
  return {
    ...worldWith(PAGE),
    index: {
      knownIn: () => known,
      pageByPath: () => PAGE,
      pageAt: () => PAGE,
      carriedIn: () => [{ key: "aids", many, pagePropertySlug: "aids", pageTypeSlug: "x" }],
      kindsUnder: () => new Set<string>(),
    } as never,
    reaching: (_world, _at, given) => {
      seen.given = given
      return Promise.resolve(NOTHING_OVER)
    },
  }
}

test("a value in a record's list field is handed on naming the record and the field", async () => {
  const seen = { given: null as unknown }

  const said = await runChange(recordWorld(true, seen), { ...IN_RECORD, value: "second" })

  expect(said.refused).toBeNull()
  expect(seen.given).toEqual({ ...IN_RECORD, value: "second" })
})

test("a field the record property declares as no list is refused", async () => {
  const seen = { given: null as unknown }

  const said = await removePropertyValue(recordWorld(false, seen), { ...IN_RECORD, value: "x" })

  expect(said.refused).toBe(
    "`aids` is no list field `directives` declares, so no value is taken out"
  )
  expect(seen.given).toBeNull()
})

test("a value named with no record is handed on as it was handed in", async () => {
  const seen = { given: null as unknown }

  await runChange(recordWorld(true, seen), ASKED)

  expect(seen.given).toEqual(ASKED)
})

test("an argument this change was handed no value for is refused by the key", async () => {
  const said = await runChange(worldWith(PAGE), { at: AT, key: "partSlugs" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`value` names what this change is handed/)
})
