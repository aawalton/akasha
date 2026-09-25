import type { Slug } from "akasha/page/properties/slug.text-property.types.ts"
import type { SetCategoryId } from "akasha/temper/catalog/gear/equipment/modules/set-category-ids/set-category-ids.module.code.ts"
import type { EquipmentPattern } from "akasha/temper/catalog/gear/equipment/modules/set-patterns/set-patterns.module.code.ts"
import type { ClassId } from "akasha/temper/player/character/formula-framework/modules/class-id/class-id.module.code.ts"
import type { Effect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"

type SetBonusStatus = "supported" | "partially-supported" | "unsupported"

interface SetBonus {
  count: number
  description: string
  effects: readonly Effect[]
  status: SetBonusStatus
}

export interface SetTemplate {
  id: Slug
  name: string
  subcategoryId: SetCategoryId
  valid: readonly EquipmentPattern[]
  bonuses: readonly SetBonus[]
  icons?: Partial<Record<EquipmentPattern, string>>
  classId?: ClassId
  esoSetId: number
}
