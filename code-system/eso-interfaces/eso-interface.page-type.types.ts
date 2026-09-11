import type { LoadedAs } from "akasha/code-system/eso-interfaces/properties/loaded-as.text-property.types.ts"
import type { Markup } from "akasha/code-system/eso-interfaces/properties/markup.file-property.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type EsoInterface = Domain & {
  markup: Markup
  loadedAs: LoadedAs
}
