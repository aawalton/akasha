import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type RunningTask = boolean

export const runningTask = {
  id: "01a0541c-db60-78b3-83f1-a50600b7b623",
  pageTypeSlug: "boolean-property",
  slug: "running-task",
  propertySlug: "running-task",
  definition: "whether a background task a seat started is still running",
} as const satisfies BooleanProperty
