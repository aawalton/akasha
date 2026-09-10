import type { Domain } from "../../domains/domain.page-type.ts"
import type { Styles } from "./properties/styles.file-property.ts"

export type Stylesheet = Domain & {
  styles: Styles
}
