import { afterAll, expect, test } from "bun:test"
import { handWrittenGlobalIsNoMethod } from "akasha/checks/code-checks/pages/hand-written-global-is-no-method/hand-written-global-is-no-method.code-check.check.code.ts"
import { DECLARATION } from "akasha/checks/code-checks/pages/hand-written-global-is-no-method/hand-written-global-is-no-method.code-check.decision.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { arriving, filing } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { valueAlsoFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { noPathsFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { shadowFor } from "akasha/pages/shadow/shadow.module.code.ts"

const OBJECTS_AT = "akasha/objects.type-declaration.ts"

const OBJECTS_D = "akasha/objects.type-declaration.d.ts"

const EXTRA_AT = "akasha/extra.type-declaration.ts"

const EXTRA_D = "akasha/extra.type-declaration.d.ts"

const OBJECTS_ID = "01a0823c-3bff-7d55-8000-000000000001"

const EXTRA_ID = "01a0823c-3bff-7d55-8000-000000000002"

const OBJECTS = `interface AddOnManager {
  GetAddOnInfo: (index?: number) => string
}
`

const NAMES_A_METHOD = "declare const GetAddOnInfo: (index?: number) => string\n"

const NAMES_NOTHING = "declare const MAX_ADDONS: number\n"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-hand-written-global-")
  noPathsFiled(root)
  filing(root, DECLARATION, "objects", OBJECTS_ID)
  filing(root, DECLARATION, "extra", EXTRA_ID)
  valueAlsoFiled(root, DECLARATION, [
    {
      path: OBJECTS_AT,
      value: {
        id: OBJECTS_ID,
        pageTypeSlug: DECLARATION,
        slug: "objects",
        generated: { writtenBy: "held" },
      },
    },
    { path: EXTRA_AT, value: { id: EXTRA_ID, pageTypeSlug: DECLARATION, slug: "extra" } },
  ])
  return root
}

function judged(change: Change): readonly Judged[] {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return handWrittenGlobalIsNoMethod(change, cast.shadow)
}

test("the check reads every declaration the index names rather than the ones the change has", () => {
  const root = rooted()
  const said = judged(arriving(root, { [OBJECTS_D]: OBJECTS, [EXTRA_D]: NAMES_A_METHOD }))
  expect(said.map((one) => one.path)).toEqual([EXTRA_D])
  expect(said[0]?.reason).toContain("GetAddOnInfo")
})

test("a hand-written declaration naming no method is let through", () => {
  const root = rooted()
  const said = judged(arriving(root, { [OBJECTS_D]: OBJECTS, [EXTRA_D]: NAMES_NOTHING }))
  expect(said).toEqual([])
})

test("a generated declaration file the change leaves at no path refuses the run", () => {
  const root = rooted()
  expect(() => judged(arriving(root, { [EXTRA_D]: NAMES_A_METHOD }))).toThrow(
    "what is judged against is short"
  )
})

test("a type declaration and the declaration file beside it are input to this check", () => {
  expect(handWrittenGlobalIsNoMethod.isInput(OBJECTS_AT, {} as never)).toBe(true)
  expect(handWrittenGlobalIsNoMethod.isInput(OBJECTS_D, {} as never)).toBe(true)
  expect(handWrittenGlobalIsNoMethod.isInput("akasha/one.module.code.ts", {} as never)).toBe(false)
})
