import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface CompanionJewelrySlotTemplate {
  id: string
  name: string
  equipType: number
  slotCategory: string
}

const COMPANION_JEWELRY_SLOT_DATA = {
  "necklace": {
    id: "necklace" as const,
    name: "Necklace",
    equipType: 2,
    slotCategory: "necklace",
  },
  "ring-1": {
    id: "ring-1" as const,
    name: "Ring 1",
    equipType: 12,
    slotCategory: "ring",
  },
  "ring-2": {
    id: "ring-2" as const,
    name: "Ring 2",
    equipType: 12,
    slotCategory: "ring",
  },
} satisfies Record<string, CompanionJewelrySlotTemplate>

export const companionJewelrySlots = createDataFile<CompanionJewelrySlotTemplate>()(
  COMPANION_JEWELRY_SLOT_DATA
)

export type CompanionJewelrySlotId = (typeof companionJewelrySlots.ids)[number]
