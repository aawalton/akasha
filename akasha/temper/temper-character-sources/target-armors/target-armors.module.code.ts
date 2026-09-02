import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface TargetArmorTemplate {
  id: string
  name: string
  armor: number
}

const TARGET_ARMOR_DATA = {
  "dungeon": { id: "dungeon", name: "Dungeon", armor: 18200 },
  "overland": { id: "overland", name: "Overland", armor: 9100 },
} as const satisfies Record<string, TargetArmorTemplate>

export const targetArmor = createDataFile<TargetArmorTemplate>()(TARGET_ARMOR_DATA)

export type TargetArmorId = (typeof targetArmor.ids)[number]
