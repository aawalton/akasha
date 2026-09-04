import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type StepDependsOn = List<string>

export const stepDependsOn = {
  id: "01a06950-236c-73b1-8d93-83ae8a83fcb0",
  pageTypeSlug: "text-property",
  slug: "step-depends-on",
  propertySlug: "depends-on",
  definition: "the steps that must finish before this one starts",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
