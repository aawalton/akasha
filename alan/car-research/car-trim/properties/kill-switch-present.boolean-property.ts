import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const killSwitchPresent = {
  id: "01a0c542-4e91-7c89-97ba-a92fbbe72eb7",
  type: "page-type/boolean-property",
  slug: "kill-switch-present",
  propertySlug: "kill-switch-present",
  definition: "whether something outside the driver can stop this trim",
  types: "ts",
} as const satisfies BooleanProperty
