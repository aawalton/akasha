import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { ChampionConstellation } from "akasha/temper/catalog/champion-point/temper-champion-star/properties/champion-constellation.text-property.types.ts"
import type { EsoChampionSkillId } from "akasha/temper/catalog/champion-point/temper-champion-star/properties/eso-champion-skill-id.number-property.types.ts"
import type { IsSlottable } from "akasha/temper/catalog/champion-point/temper-champion-star/properties/is-slottable.boolean-property.types.ts"
import type { HashPlace } from "akasha/temper/catalog/companion/trait/properties/hash-place.number-property.types.ts"
import type { SourceEffects } from "akasha/temper/player/character/source/temper-target/properties/source-effects.record-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperChampionStar = TemperThing & {
  description: Description
  esoChampionSkillId: EsoChampionSkillId
  championConstellation: ChampionConstellation
  isSlottable: IsSlottable
  effects?: SourceEffects
  hashPlace: HashPlace
}
