import type { TextProperty } from "@akasha/pages-system/text-property"

export type Scope = string

export const scope = {
  id: "01a05fc6-81fe-702d-b91e-6a8fb0278170",
  pageTypeSlug: "text-property",
  slug: "scope",
  propertySlug: "scope",
  definition: "how widely a task reaches across an account",
  max: 20,
  nameFormatSlug: "name-format/lower-snake-case",
} as const satisfies TextProperty
