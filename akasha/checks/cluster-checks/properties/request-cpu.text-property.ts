import type { TextProperty } from "@akasha/pages-system/text-property"

export type RequestCpu = string

export const requestCpu = {
  id: "01a0680b-1003-7991-ab8e-fb7fe08d14a1",
  pageTypeSlug: "text-property",
  slug: "request-cpu",
  propertySlug: "request-cpu",
  definition: "the processor time a pod asks for",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
