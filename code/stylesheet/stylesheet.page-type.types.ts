import type { Reached } from "akasha/code/stylesheet/properties/reached.file-property.types.ts"
import type { Styles } from "akasha/code/stylesheet/properties/styles.file-property.types.ts"
import type { StylesheetColors } from "akasha/code/stylesheet/properties/stylesheet-colors.record-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type Stylesheet = Domain & {
  styles: Styles
  reached?: Reached
  colors?: StylesheetColors
}
