import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type HasOnUseAbility = boolean

export const hasOnUseAbility = {
  id: "01a05fcd-f54f-7651-adeb-64f80b10b6bf",
  pageTypeSlug: "boolean-property",
  slug: "has-on-use-ability",
  propertySlug: "has-on-use-ability",
  definition: "whether an item does something when used",
} as const satisfies BooleanProperty
