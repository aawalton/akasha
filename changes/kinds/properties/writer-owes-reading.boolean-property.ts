import type { BooleanProperty } from "../../../pages/boolean-properties/boolean-property.page-type.ts"

export type WriterOwesReading = boolean

export const writerOwesReading = {
  id: "01a05e19-7ffb-7e64-a651-4f26f37b2e7b",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "writer-owes-reading",
  propertySlug: "writer-owes-reading",
  definition: "whether the writer of a change of this kind owes the readings its paths warrant",
} as const satisfies BooleanProperty
