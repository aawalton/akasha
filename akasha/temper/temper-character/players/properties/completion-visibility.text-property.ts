import type { TextProperty } from "@akasha/pages-system/text-property"

export type CompletionVisibility = string

export const completionVisibility = {
  id: "01a05fcd-f557-7c35-987a-480c078751bb",
  pageTypeSlug: "text-property",
  slug: "completion-visibility",
  propertySlug: "completion-visibility",
  definition: "who a player lets read what that player has finished",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
