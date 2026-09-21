import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { SheetEffect } from "akasha/story/game/entity/properties/sheet-effect.text-property.types.ts"
import type { SheetName } from "akasha/story/game/entity/properties/sheet-name.text-property.types.ts"
import type { SheetSource } from "akasha/story/game/entity/properties/sheet-source.text-property.types.ts"

export type EntityTraits = List<{
  name: SheetName
  effect: SheetEffect
  source?: SheetSource
}>
