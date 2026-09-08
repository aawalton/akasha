import type { Attribute } from "./attribute.page-type.ts"
import type { AttributeLevel } from "./properties/attribute-level.computed-property.ts"

export type WorkedAttribute = Attribute & {
  level?: AttributeLevel
}
