import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const killSwitchNotes = {
  id: "01a0c543-cf96-7104-a2fd-bd3a908ade48",
  type: "page-type/text-property",
  slug: "kill-switch-notes",
  propertySlug: "kill-switch-notes",
  definition: "what is known of anything outside the driver that can stop a trim",
  maxLength: 1000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
