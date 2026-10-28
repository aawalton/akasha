import type { TemperAbility } from "akasha/temper/catalog/ability/temper-ability.page-type.types.ts"
import type { TemperDebuffOther } from "akasha/temper/catalog/effect/temper-debuff-other/temper-debuff-other.page-type.types.ts"

export type TemperStatusEffect = TemperDebuffOther & TemperAbility & {}
