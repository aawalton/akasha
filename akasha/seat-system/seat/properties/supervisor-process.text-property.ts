import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type SupervisorProcess = string

export const supervisorProcess = {
  id: "01a05035-2609-733b-a82d-b7b638de65e1",
  pageTypeSlug: "text-property",
  slug: "supervisor-process",
  definition: "the process keeping a seat filled, and when that process started",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
