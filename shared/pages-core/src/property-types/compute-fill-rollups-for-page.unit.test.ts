import { describe, expect, test } from "bun:test"
import type { PageDataJSON, PropertyDefinition } from "../types"
import { computeFillRollupsForPage, type PageTypePropertiesMap } from "./rollup"

describe("computeFillRollupsForPage", () => {
  const TASK_TYPE = "task-type"
  const CHARACTER_TYPE = "character-type"

  const characterDefs: readonly PropertyDefinition[] = [
    { id: "sortOrder", title: "Sort Order", type: "number" },
  ]

  const taskDefs: readonly PropertyDefinition[] = [
    {
      id: "character",
      title: "Character",
      type: "relation",
      config: { targetPageTypeId: CHARACTER_TYPE },
    },
    {
      id: "characterSortOrder",
      title: "Character Sort Order",
      type: "rollup",
      config: { relationPropertyId: "character", targetPropertyId: "sortOrder" },
    },
  ]

  const pageTypes: PageTypePropertiesMap = new Map([
    [TASK_TYPE, taskDefs],
    [CHARACTER_TYPE, characterDefs],
  ])

  const relatedPages = [
    { id: "erin", data: { pageTypeId: CHARACTER_TYPE, sortOrder: 1 } satisfies PageDataJSON },
    { id: "maviola", data: { pageTypeId: CHARACTER_TYPE, sortOrder: 2 } satisfies PageDataJSON },
  ]

  test("fills the rollup key by resolving relation → target property", () => {
    const data = { pageTypeId: TASK_TYPE, character: "maviola" } satisfies PageDataJSON
    const result = computeFillRollupsForPage(data, taskDefs, relatedPages, pageTypes)
    expect(result).toEqual({ characterSortOrder: 2 })
  })

  test("resolves each row's own target (the multi-key discriminator)", () => {
    const erinTask = { pageTypeId: TASK_TYPE, character: "erin" } satisfies PageDataJSON
    expect(computeFillRollupsForPage(erinTask, taskDefs, relatedPages, pageTypes)).toEqual({
      characterSortOrder: 1,
    })
  })

  test("fills null when the target page is not resident (unacquired target)", () => {
    const data = { pageTypeId: TASK_TYPE, character: "ghost" } satisfies PageDataJSON
    expect(computeFillRollupsForPage(data, taskDefs, relatedPages, pageTypes)).toEqual({
      characterSortOrder: null,
    })
  })

  test("never overwrites a rollup value already present on the row", () => {
    const data = {
      pageTypeId: TASK_TYPE,
      character: "maviola",
      characterSortOrder: 99,
    } satisfies PageDataJSON
    expect(computeFillRollupsForPage(data, taskDefs, relatedPages, pageTypes)).toEqual({})
  })

  test("returns an empty object when there are no rollup definitions", () => {
    const data = { pageTypeId: CHARACTER_TYPE, sortOrder: 1 } satisfies PageDataJSON
    expect(computeFillRollupsForPage(data, characterDefs, relatedPages, pageTypes)).toEqual({})
  })
})
