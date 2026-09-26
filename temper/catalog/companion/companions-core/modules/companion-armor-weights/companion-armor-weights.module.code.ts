import { companionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"

export type CompanionArmorWeight = "no-weight" | "light" | "medium" | "heavy"

export function isCompanionArmorWeight(value: unknown): value is CompanionArmorWeight {
  return value === "no-weight" || value === "light" || value === "medium" || value === "heavy"
}

export interface CompanionArmorWeightTemplate {
  readonly id: CompanionArmorWeight
  readonly name: string
  readonly armorType: number | null
}

export function companionArmorWeights(): readonly CompanionArmorWeightTemplate[] {
  return companionCatalog().armorWeights
}
