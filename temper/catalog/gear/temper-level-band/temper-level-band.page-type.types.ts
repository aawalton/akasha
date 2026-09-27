import type { LevelBandBottom } from "akasha/temper/catalog/gear/temper-level-band/properties/level-band-bottom.number-property.types.ts"
import type { LevelBandPrefix } from "akasha/temper/catalog/gear/temper-level-band/properties/level-band-prefix.text-property.types.ts"
import type { LevelBandTop } from "akasha/temper/catalog/gear/temper-level-band/properties/level-band-top.number-property.types.ts"
import type { WorthLevelSpan } from "akasha/temper/catalog/gear/temper-level-band/properties/worth-level-span.number-property.types.ts"
import type { WorthLevelStart } from "akasha/temper/catalog/gear/temper-level-band/properties/worth-level-start.number-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperLevelBand = TemperThing & {
  levelBandPrefix?: LevelBandPrefix
  levelBandBottom: LevelBandBottom
  levelBandTop: LevelBandTop
  worthLevelStart: WorthLevelStart
  worthLevelSpan: WorthLevelSpan
}
