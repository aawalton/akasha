import type { LoadedAs } from "akasha/code/eso-interface/properties/loaded-as.text-property.types.ts"
import type { Markup } from "akasha/code/eso-interface/properties/markup.file-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type EsoInterface = Domain & {
  markup: Markup
  loadedAs: LoadedAs
}
