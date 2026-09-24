import { afterAll, expect, test } from "bun:test"
import {
  removePropertyValue,
  runChange,
} from "akasha/change/agent/file-content/remove-property-value/remove-property-value.change-agent.code.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import { removePropertyValue as removePropertyValueMechanical } from "akasha/change/mechanical/file-content/remove/remove-property-value/remove-property-value.change-mechanical-file-content.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  NOTHING_OVER,
  type World,
  worldAt,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { running } from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  bodyAfter,
  knownOf,
} from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import {
  graphedRepo,
  idOf,
  pageOf,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

afterAll(scratch.sweep)

const AT = "held/held.domain.ts"

const ID = "01a072c8-f35d-7ffc-afc3-75b72460b059"

const PAGE = { id: ID, pageTypeSlug: "domain", slug: "held" } as Value

const RUNS = `${changeMechanicalFileContent.slug}/${removePropertyValueMechanical.slug}` as const

const NO_FILES = new Map()

function worldWith(page: Value | null): World {
  const known = knownOf({})
  return {
    root: "/nowhere",
    index: {
      knownIn: () => known,
      pageByPath: () => page,
      filePropertiesAt: () => NO_FILES,
      uncommittedFiledAt: () => NO_FILES,
    } as never,
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
      filePropertiesAt: () => NO_FILES,
      uncommittedFiledAt: () => NO_FILES,
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

const PAIR_PAGE = "akasha/five/pair.module.ts"

const PAIR_CODE = "akasha/five/pair.module.code.ts"

const PAIR_TEST = "akasha/five/pair.module.test.ts"

const TAKE_TEST = { at: PAIR_PAGE, key: "test", value: "ts" }

function pairWorld(tested: boolean): World {
  const named: Record<string, string> = {
    [PAIR_PAGE]: pageOf({
      id: idOf("d"),
      pageTypeSlug: "module",
      slug: "pair",
      definition: "a page whose test sits beside it",
      code: "ts",
      test: "ts",
    }),
    [PAIR_CODE]: "export const pair = 1\n",
  }
  if (tested) {
    named[PAIR_TEST] = 'import { pair } from "./pair.module.code.ts"\n\nexport const said = pair\n'
  }
  const root = graphedRepo(named)
  return worldAt(root, textIn(root), running)
}

test("taking `test` off a module takes the test file away with the value", async () => {
  const world = pairWorld(true)

  const said = await removePropertyValue(world, TAKE_TEST)

  expect(said.refused).toBeNull()
  expect([...pathsIn(said)].sort()).toEqual([PAIR_PAGE, PAIR_TEST].sort())
  expect(bodyAfter(said, world, PAIR_PAGE)).not.toContain('"test"')
})

test("a value whose file is absent is taken out alone, and the answer says so", async () => {
  const world = pairWorld(false)

  const said = await removePropertyValue(world, TAKE_TEST)

  expect(said.refused).toBeNull()
  expect([...pathsIn(said)]).toEqual([PAIR_PAGE])
  expect(said.told).toEqual([
    `\`${PAIR_TEST}\` holds no body, so the value is taken out and no file is taken away`,
  ])
})

test("a value of a property held in no file reaches nothing but the value's removal", async () => {
  const reached: string[] = []
  const world = worldWith(PAGE)

  const said = await removePropertyValue(
    {
      ...world,
      index: {
        ...world.index,
        filePropertiesAt: () => new Map([["domain", new Map([["code", null]])]]),
      } as never,
      bodyOf: () => "held",
      reaching: (_world, at) => {
        reached.push(at)
        return Promise.resolve(NOTHING_OVER)
      },
    },
    ASKED
  )

  expect(said.refused).toBeNull()
  expect(reached).toEqual([RUNS])
})
