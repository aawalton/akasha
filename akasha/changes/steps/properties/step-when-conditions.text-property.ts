import type { List } from "@akasha/pages-system/page-property"
import type { TextProperty } from "@akasha/pages-system/text-property"

export type StepWhenConditions = List<string>

export const stepWhenConditions = {
  id: "01a06950-236c-7100-990b-75eea39f20c8",
  pageTypeSlug: "text-property",
  slug: "step-when-conditions",
  propertySlug: "when-conditions",
  definition: "the conditions that decide whether this step runs",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
