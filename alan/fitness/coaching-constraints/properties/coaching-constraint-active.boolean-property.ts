import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type CoachingConstraintActive = boolean

export const coachingConstraintActive = {
  id: "01a0657a-fe00-736c-907b-2cb955431927",
  pageTypeSlug: "boolean-property",
  slug: "coaching-constraint-active",
  propertySlug: "coaching-constraint-active",
  definition: "whether the constraint still binds what the coach programs",
} as const satisfies BooleanProperty
