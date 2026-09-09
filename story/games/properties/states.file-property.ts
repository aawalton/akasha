import type { FileProperty } from "@akasha/pages/file-property"

export type States = "jsonl"

export const states = {
  id: "01a0673c-8e0e-7016-9a4f-051e3200a488",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "states",
  propertySlug: "states",
  definition: "what a game's world has been at, sitting by sitting",
} as const satisfies FileProperty
