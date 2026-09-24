import type { StylesheetColor } from "akasha/code/stylesheet/properties/stylesheet-color.relation-property.types.ts"
import type { StylesheetColorName } from "akasha/code/stylesheet/properties/stylesheet-color-name.text-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type StylesheetColors = List<{
  name: StylesheetColorName
  color: StylesheetColor
}>
