import { createDataFile } from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"

interface JewelryTypeTemplate {
  id: string
  name: string
  validSlots: readonly string[]
}

const JEWELRY_TYPE_DATA = {
  "necklace": { id: "necklace" as const, name: "Necklace", validSlots: ["necklace"] as const },
  "ring": { id: "ring" as const, name: "Ring", validSlots: ["ring-1", "ring-2"] as const },
} satisfies Record<string, JewelryTypeTemplate>

export const jewelryTypes = createDataFile<JewelryTypeTemplate>()(JEWELRY_TYPE_DATA)

export type JewelryTypeId = (typeof jewelryTypes.ids)[number]
