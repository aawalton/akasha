import type {
  OtherArmorWeightId,
  StandardArmorWeightId as StandardArmorWeightPageSlug,
} from "akasha/temper/catalog/gear/equipment/kind/modules/gear-kind-ids/gear-kind-ids.data-table.code.ts"

export type StandardArmorWeightId = StandardArmorWeightPageSlug

export type ArmorWeightId = StandardArmorWeightId | OtherArmorWeightId
