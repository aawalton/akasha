import { companionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"

export type CompanionEquipmentQualityId =
  | "no-quality"
  | "normal"
  | "fine"
  | "superior"
  | "epic"
  | "legendary"

export function isCompanionEquipmentQualityId(
  value: unknown
): value is CompanionEquipmentQualityId {
  return (
    value === "no-quality" ||
    value === "normal" ||
    value === "fine" ||
    value === "superior" ||
    value === "epic" ||
    value === "legendary"
  )
}

export interface CompanionBaseValues {
  readonly lightArmor: number
  readonly mediumArmor: number
  readonly heavyArmor: number
  readonly oneHandedDamage: number
  readonly twoHandedDamage: number
  readonly shieldArmor: number
}

export interface CompanionEquipmentQualityTemplate {
  readonly id: CompanionEquipmentQualityId
  readonly name: string
  readonly available: boolean
  readonly baseValues: CompanionBaseValues
}

export function companionEquipmentQualities(): readonly CompanionEquipmentQualityTemplate[] {
  return companionCatalog().qualities
}

export function companionEquipmentQualityAt(
  id: CompanionEquipmentQualityId
): CompanionEquipmentQualityTemplate {
  const quality = companionEquipmentQualities().find((one) => one.id === id)
  if (quality === undefined) throw new Error(`no companion quality page answers to \`${id}\``)
  return quality
}

export function companionEquipmentQualityName(id: CompanionEquipmentQualityId): string {
  return companionEquipmentQualityAt(id).name
}
