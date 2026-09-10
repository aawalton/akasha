import type { Domain } from "../../domains/domain.page-type.ts"
import type { LoadedAs } from "./properties/loaded-as.text-property.ts"
import type { Markup } from "./properties/markup.file-property.ts"

export type EsoInterface = Domain & {
  markup: Markup
  loadedAs: LoadedAs
}
