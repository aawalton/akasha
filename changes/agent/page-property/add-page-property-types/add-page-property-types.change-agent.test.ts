import { expect, test } from "bun:test"
import {
  addPagePropertyTypes,
  runChange,
} from "akasha/changes/agent/page-property/add-page-property-types/add-page-property-types.change-agent.code.ts"
import {
  AT,
  TO,
} from "akasha/changes/agent/page-property/add-page-property-types/add-page-property-types.change-agent.test-fixtures.ts"
import type { Reaching, World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  catching,
  refusingAt,
  worldOf,
} from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"

const KIND = "boolean-property"

const STATED = "change-mechanical-file-content/add-page-property"

const MOVED = "change-mechanical/move-code-export"

type Reached = { readonly at: string; readonly given: Record<string, unknown> }

function worldFor(
  reaching: Reaching,
  kinds: readonly string[],
  paths: readonly string[],
  stated: Record<string, string> = {}
): World {
  return {
    ...worldOf({}),
    index: {
      kindsUnder: () => new Set(kinds),
      everyOfType: () => paths.map((path) => ({ path })),
      pageByPath: () => ({ pageTypeSlug: KIND, slug: "mortal", ...stated }),
    } as never,
    reaching,
  }
}

test("a page stating its type already is passed over rather than stated again", async () => {
  const seen: Reached[] = []

  const said = await addPagePropertyTypes(worldFor(catching(seen), [KIND], [AT], { types: "ts" }), {
    pageType: KIND,
  })

  expect(said.refused ?? "").toMatch(/states its type already/)
  expect(seen).toEqual([])
})

test("every page of the page type gains the key and hands its type on, in that order", async () => {
  const seen: Reached[] = []

  const said = await addPagePropertyTypes(worldFor(catching(seen), [KIND], [AT]), {
    pageType: KIND,
  })

  expect(said.refused).toBeNull()
  expect(seen.map((one) => one.at)).toEqual([STATED, MOVED])
})

test("the key stated is the one naming the file beside, under the extension it holds", async () => {
  const seen: Reached[] = []

  await addPagePropertyTypes(worldFor(catching(seen), [KIND], [AT]), { pageType: KIND })

  expect(seen[0]?.given).toEqual({ at: AT, key: "types", value: '"ts"' })
})

test("the type handed on is the one named for the page property's slug", async () => {
  const seen: Reached[] = []

  await addPagePropertyTypes(worldFor(catching(seen), [KIND], [AT]), { pageType: KIND })

  expect(seen[1]?.given).toEqual({ from: AT, to: TO, of: "Mortal" })
})

test("a page type no page property is refuses, and nothing is reached", async () => {
  const seen: Reached[] = []

  const said = await addPagePropertyTypes(worldFor(catching(seen), [], [AT]), { pageType: KIND })

  expect(said.refused ?? "").toMatch(/names no page type a page property is/)
  expect(seen).toEqual([])
})

test("a page type no page is of refuses, and nothing is reached", async () => {
  const seen: Reached[] = []

  const said = await addPagePropertyTypes(worldFor(catching(seen), [KIND], []), { pageType: KIND })

  expect(said.refused ?? "").toMatch(/no page is a/)
  expect(seen).toEqual([])
})

test("a refusal from the change stating the key names the page and leaves the type", async () => {
  const seen: Reached[] = []

  const said = await addPagePropertyTypes(worldFor(refusingAt(seen, STATED), [KIND], [AT]), {
    pageType: KIND,
  })

  expect(said.refused ?? "").toContain(AT)
  expect(seen.map((one) => one.at)).toEqual([STATED])
})

test("a refusal from the change moving the type names the page", async () => {
  const seen: Reached[] = []

  const said = await addPagePropertyTypes(worldFor(refusingAt(seen, MOVED), [KIND], [AT]), {
    pageType: KIND,
  })

  expect(said.refused ?? "").toContain(AT)
  expect(said.refused ?? "").toMatch(/move-code-export/)
})

test("every page is reached rather than the first alone", async () => {
  const seen: Reached[] = []

  await addPagePropertyTypes(
    worldFor(catching(seen), [KIND], [AT, "held/ones/properties/kept.boolean-property.ts"]),
    {
      pageType: KIND,
    }
  )

  expect(seen).toHaveLength(4)
})

test("a folder named holds the change to the pages under that folder", async () => {
  const seen: Reached[] = []

  await addPagePropertyTypes(
    worldFor(catching(seen), [KIND], [AT, "apart/ones/properties/kept.boolean-property.ts"]),
    { pageType: KIND, under: "held/" }
  )

  expect(seen).toHaveLength(2)
})

test("a folder no page of that page type sits under is refused", async () => {
  const seen: Reached[] = []

  const said = await addPagePropertyTypes(worldFor(catching(seen), [KIND], [AT]), {
    pageType: KIND,
    under: "apart/",
  })

  expect(said.refused ?? "").toMatch(/no page is a/)
  expect(seen).toEqual([])
})

test("arguments holding no page type are refused by the name of the argument", async () => {
  const said = await runChange(worldFor(catching([]), [KIND], [AT]), {})

  expect(said.refused ?? "").toMatch(/`page-type`/)
})
