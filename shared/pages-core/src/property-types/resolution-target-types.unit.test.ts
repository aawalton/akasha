import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import type { PageTypePropertiesMap } from "./rollup"
import { collectResolutionTargetTypeIds } from "./resolution-target-types"

const TASK = "task"
const PERSON = "person"
const COMPANY = "company"

const TASK_DEFS: readonly PropertyDefinition[] = [
  { id: "title", title: "Title", type: "text" },
  { id: "owner", title: "Owner", type: "relation", config: { targetPageTypeId: PERSON } },
  { id: "kids", title: "Kids", type: "multi-relation", config: { targetPageTypeId: PERSON } },
  {
    id: "ownerName",
    title: "Owner Name",
    type: "rollup",
    config: { relationPropertyId: "owner", targetPropertyId: "name" },
  },
  {
    id: "ownerCompanyName",
    title: "Owner Company Name",
    type: "rollup",
    config: { relationPropertyId: "owner", targetPropertyId: "companyName" },
  },
  {
    id: "kidWeightSum",
    title: "Kid Weight Sum",
    type: "aggregate",
    config: { relationPropertyId: "kids", targetPropertyId: "weight", function: "sum" },
  },
]

const PERSON_DEFS: readonly PropertyDefinition[] = [
  { id: "name", title: "Name", type: "text" },
  { id: "weight", title: "Weight", type: "number" },
  { id: "company", title: "Company", type: "relation", config: { targetPageTypeId: COMPANY } },
  {
    id: "companyName",
    title: "Company Name",
    type: "rollup",
    config: { relationPropertyId: "company", targetPropertyId: "name" },
  },
]

const COMPANY_DEFS: readonly PropertyDefinition[] = [{ id: "name", title: "Name", type: "text" }]

const DEFS: PageTypePropertiesMap = new Map([
  [TASK, TASK_DEFS],
  [PERSON, PERSON_DEFS],
  [COMPANY, COMPANY_DEFS],
])

function collect(key: string): readonly string[] {
  const def = TASK_DEFS.find((d) => d.id === key)
  if (def === undefined) throw new Error(`no def ${key}`)
  return [...collectResolutionTargetTypeIds(def, TASK, DEFS)].sort()
}

describe("collectResolutionTargetTypeIds", () => {
  test("relation → the relation's target page-type", () => {
    expect(collect("owner")).toEqual([PERSON])
  })

  test("multi-relation → the relation's target page-type", () => {
    expect(collect("kids")).toEqual([PERSON])
  })

  test("single-hop rollup → the walked relation's target type", () => {
    expect(collect("ownerName")).toEqual([PERSON])
  })

  test("chained rollup → EVERY target type along the chain", () => {
    expect(collect("ownerCompanyName")).toEqual([COMPANY, PERSON])
  })

  test("aggregate → the folded relation's target type", () => {
    expect(collect("kidWeightSum")).toEqual([PERSON])
  })

  test("non-computed property → no targets", () => {
    expect(collect("title")).toEqual([])
  })

  test("malformed rollup config → no targets, no throw", () => {
    const bad: PropertyDefinition = { id: "x", title: "X", type: "rollup", config: {} }
    expect([...collectResolutionTargetTypeIds(bad, TASK, DEFS)]).toEqual([])
  })

  test("rollup whose relation prop is absent → no targets", () => {
    const orphan: PropertyDefinition = {
      id: "y",
      title: "Y",
      type: "rollup",
      config: { relationPropertyId: "missing", targetPropertyId: "name" },
    }
    expect([...collectResolutionTargetTypeIds(orphan, TASK, DEFS)]).toEqual([])
  })
})
