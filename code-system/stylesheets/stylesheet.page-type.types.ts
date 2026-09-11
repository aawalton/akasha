import type { Styles } from "akasha/code-system/stylesheets/properties/styles.file-property.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type Stylesheet = Domain & {
  styles: Styles
}
