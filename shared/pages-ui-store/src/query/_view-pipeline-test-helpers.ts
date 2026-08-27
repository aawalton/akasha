import type { PageRow } from "../collection/page-row"
import { createPagesCollection } from "../collection/pages-collection"
import type { UseViewQueryOptions } from "../sql/options"
import { id, ROOT, type RowOverrides, row } from "./__fixtures__/view-pipeline-rows"
import { createViewPipeline } from "./view-pipeline"

export const TASK_TYPE = "00000000-0000-7000-8000-0000000000a1"
export const PERSON_TYPE = "00000000-0000-7000-8000-0000000000a2"

export const TASK_DEFS = [
  { id: "status", title: "Status", type: "select" },
  { id: "priority", title: "Priority", type: "number" },
  { id: "due", title: "Due", type: "instant" },
  { id: "owner", title: "Owner", type: "relation", config: { targetPageTypeId: PERSON_TYPE } },
  {
    id: "ownerName",
    title: "Owner Name",
    type: "rollup",
    config: { relationPropertyId: "owner", targetPropertyId: "name" },
  },
  {
    id: "ownerSortOrder",
    title: "Owner Sort Order",
    type: "rollup",
    config: { relationPropertyId: "owner", targetPropertyId: "sortOrder" },
  },
  { id: "kids", title: "Kids", type: "multi-relation", config: { targetPageTypeId: PERSON_TYPE } },
  {
    id: "kidSum",
    title: "Kid Sum",
    type: "aggregate",
    config: { relationPropertyId: "kids", targetPropertyId: "weight", function: "sum" },
  },
  {
    id: "kidMin",
    title: "Kid Min",
    type: "aggregate",
    config: { relationPropertyId: "kids", targetPropertyId: "weight", function: "min" },
  },
  { id: "favoritedAt", title: "Favorited At", type: "instant" },
]

export const PERSON_DEFS = [
  { id: "name", title: "Name", type: "text" },
  { id: "sortOrder", title: "Sort Order", type: "number" },
  { id: "weight", title: "Weight", type: "number" },
  { id: "favoritedAt", title: "Favorited At", type: "instant" },
]

export function taskTypeRow(): PageRow {
  return row({
    id: TASK_TYPE,
    pageTypeId: ROOT,
    slug: "page-type",
    title: "Task",
    attributes: { slug: "task", propertyDefinitions: TASK_DEFS },
  })
}

export function personTypeRow(): PageRow {
  return row({
    id: PERSON_TYPE,
    pageTypeId: ROOT,
    slug: "page-type",
    title: "Person",
    attributes: { slug: "person", propertyDefinitions: PERSON_DEFS },
  })
}

export function task(
  n: number,
  attributes: Readonly<Record<string, unknown>>,
  extra?: Partial<RowOverrides>
): PageRow {
  return row({ id: id(n), pageTypeId: TASK_TYPE, slug: "task", seq: n, attributes, ...extra })
}

export async function readIds(
  rows: readonly PageRow[],
  options: UseViewQueryOptions
): Promise<{ ids: string[]; count: number }> {
  const handle = createPagesCollection()
  try {
    await handle.collection.preload()
    handle.controller.seed(rows)
    const pipe = createViewPipeline(handle.collection, options)
    try {
      const res = pipe.read()
      return { ids: res.rows.map((r) => r.id), count: res.totalCount }
    } finally {
      pipe.dispose()
    }
  } finally {
    handle.cleanup()
  }
}
