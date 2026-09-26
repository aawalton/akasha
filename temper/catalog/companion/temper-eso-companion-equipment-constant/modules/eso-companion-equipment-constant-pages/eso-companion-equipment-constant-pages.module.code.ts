import { companionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"

export interface CompanionEquipmentConstant {
  readonly kind: string
  readonly keyText: string
  readonly valueNum: number | null
  readonly valueText: string | null
}

function constantOf(kind: string, keyText: string): CompanionEquipmentConstant | undefined {
  return companionCatalog().equipmentConstants.find(
    (one) => one.kind === kind && one.keyText === keyText
  )
}

export function equipTypeNumber(name: string): number {
  const found = constantOf("equip-type", name)?.valueNum
  if (found == null) throw new Error(`no companion equipment constant page numbers ${name}`)
  return found
}

export function companionQualityToEso(quality: string): number | undefined {
  return constantOf("quality-companion-to-eso", quality)?.valueNum ?? undefined
}

export function esoQualityToCompanion(esoQuality: number): string | undefined {
  return constantOf("quality-eso-to-companion", String(esoQuality))?.valueText ?? undefined
}
