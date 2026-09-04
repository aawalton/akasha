import type { TextProperty } from "@akasha/pages-system/text-property"

export type TraceSource = string

export const traceSource = {
  id: "01a06935-68b5-768c-abad-bcf6356b4cfe",
  pageTypeSlug: "text-property",
  slug: "trace-source",
  propertySlug: "source",
  definition: "what put this trace in the store",
  max: 32,
  nameFormatSlug: null,
} as const satisfies TextProperty
