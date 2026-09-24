import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { AntiquityName } from "akasha/temper/catalog/pursuit/temper-antiquity-category/properties/antiquity-name.text-property.types.ts"
import type { AntiquitySet } from "akasha/temper/catalog/pursuit/temper-antiquity-category/properties/antiquity-set.relation-property.types.ts"
import type { EsoAntiquityId } from "akasha/temper/catalog/pursuit/temper-antiquity-category/properties/eso-antiquity-id.number-property.types.ts"
import type { TotalLoreEntries } from "akasha/temper/catalog/pursuit/temper-antiquity-category/properties/total-lore-entries.number-property.types.ts"
import type { EsoAntiquitySetId } from "akasha/temper/catalog/pursuit/temper-antiquity-set/properties/eso-antiquity-set-id.number-property.types.ts"

export type Antiquities = "jsonl"

export type AntiquitiesRow = {
  id: Id
  esoAntiquityId: EsoAntiquityId
  antiquityName: AntiquityName
  esoAntiquitySetId: EsoAntiquitySetId
  set?: AntiquitySet
  totalLoreEntries: TotalLoreEntries
}
