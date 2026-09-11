import { expect, test } from "bun:test"
import {
  changeCalculationHeldType,
  runChange,
} from "akasha/changes/agent/page-property/change-calculation-held-type/change-calculation-held-type.change-agent.code.ts"
import type { Reaching, World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  catching,
  refusingAt,
  worldOf,
} from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"

const KIND = "computed-property"

const AT = "held/ones/properties/total-remaining.computed-property.ts"

const APART = "apart/ones/properties/total-remaining.computed-property.ts"

const CODE = "held/ones/properties/total-remaining.computed-property.code.ts"

const APART_CODE = "apart/ones/properties/total-remaining.computed-property.code.ts"

const REACHED = "change-mechanical-file-content/change-file-content-code"

const WORK_AT =
  'import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"'

const BODY = `${WORK_AT}

export const work: Work<Collection, number> = () => 1
`

const NAMED = `${WORK_AT}

export const work: Work<Collection, TotalRemaining> = () => 1
`

const LOOSE = `${WORK_AT}

export const held = 1
`

const REACHING_AT =
  'import type { Reach, Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"'

const REACHING = `${REACHING_AT}

export const work: Work<Collection, number> = () => 1
`

type Caught = { at: string; given: Record<string, unknown> }

function worldFor(
  reaching: Reaching,
  bodies: Readonly<Record<string, string>>,
  paths: readonly string[] = [AT]
): World {
  return {
    ...worldOf(bodies),
    index: {
      kindsUnder: () => new Set([KIND]),
      everyOfType: () => paths.map((path) => ({ path })),
      pageByPath: () => ({
        pageTypeSlug: KIND,
        slug: "total-remaining",
        code: "ts",
        types: "ts",
      }),
    } as never,
    reaching,
  }
}

test("a calculation is named its property's written type", async () => {
  const seen: Caught[] = []

  const said = await changeCalculationHeldType(worldFor(catching(seen), { [CODE]: BODY }), {})

  expect(said.refused).toBeNull()
  expect(seen[0]?.given).toEqual({
    at: CODE,
    new: "export const work: Work<Collection, TotalRemaining>",
    old: "export const work: Work<Collection, number>",
  })
})

test("the type named is imported from beside the property", async () => {
  const seen: Caught[] = []

  await changeCalculationHeldType(worldFor(catching(seen), { [CODE]: BODY }), {})

  expect(String(seen[1]?.given ? (seen[1]?.given as { new: string }).new : "")).toContain(
    'import type { TotalRemaining } from "akasha/held/ones/properties/total-remaining.computed-property.types.ts"'
  )
})

test("a calculation taking a reach as well is named beside the shape it takes", async () => {
  const seen: Caught[] = []

  const said = await changeCalculationHeldType(worldFor(catching(seen), { [CODE]: REACHING }), {})

  expect(said.refused).toBeNull()
  expect(seen[1]?.given).toEqual({
    at: CODE,
    new: `import type { TotalRemaining } from "akasha/held/ones/properties/total-remaining.computed-property.types.ts"\n${REACHING_AT}`,
    old: REACHING_AT,
  })
})

test("a calculation already naming that type is passed over", async () => {
  const seen: Caught[] = []

  const said = await changeCalculationHeldType(worldFor(catching(seen), { [CODE]: NAMED }), {})

  expect(said.refused ?? "").toMatch(/names its property's type already/)
  expect(seen).toEqual([])
})

test("a code file exporting no such calculation is refused", async () => {
  const seen: Caught[] = []

  const said = await changeCalculationHeldType(worldFor(catching(seen), { [CODE]: LOOSE }), {})

  expect(said.refused ?? "").toMatch(/exports no calculation/)
  expect(said.refused ?? "").toContain(CODE)
})

test("a refusal from the change working the passage names the code", async () => {
  const seen: Caught[] = []

  const said = await changeCalculationHeldType(
    worldFor(refusingAt(seen, REACHED), { [CODE]: BODY }),
    {}
  )

  expect(said.refused ?? "").toContain(CODE)
})

test("a folder named holds the change to the pages sitting under that folder", async () => {
  const seen: Caught[] = []

  await runChange(worldFor(catching(seen), { [CODE]: BODY, [APART_CODE]: BODY }, [AT, APART]), {
    under: "held/",
  })

  expect(seen).toHaveLength(2)
})
