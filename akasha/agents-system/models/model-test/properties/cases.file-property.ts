import type { FileProperty } from "../../../../pages-system/file-property/file-property.page-type.ts"

export type Cases = "jsonl"

export const cases = {
  id: "01a053eb-6b25-7c2a-a50f-f804c41457e3",
  pageTypeSlug: "file-property",
  slug: "cases",
  propertySlug: "cases",
  definition: "the labelled texts a prompt is judged by",
} as const satisfies FileProperty
