import type { Styles } from "akasha/code/stylesheets/properties/styles.file-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type Stylesheet = Domain & {
  styles: Styles
}
