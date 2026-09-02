import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface ClassTemplate {
  id: ClassId
  name: string
  icon: string
  esoClassId: number
}

export const TEMPER_CLASSES = {
  "arcanist": { id: "arcanist", name: "Arcanist", icon: "📖", esoClassId: 117 },
  "dragonknight": { id: "dragonknight", name: "Dragonknight", icon: "🔥", esoClassId: 1 },
  "necromancer": { id: "necromancer", name: "Necromancer", icon: "💀", esoClassId: 5 },
  "nightblade": { id: "nightblade", name: "Nightblade", icon: "🗡️", esoClassId: 3 },
  "no-class": { id: "no-class", name: "No Class", icon: "", esoClassId: 0 },
  "sorcerer": { id: "sorcerer", name: "Sorcerer", icon: "⚡", esoClassId: 2 },
  "templar": { id: "templar", name: "Templar", icon: "☀️", esoClassId: 6 },
  "warden": { id: "warden", name: "Warden", icon: "🐻", esoClassId: 4 },
} as const satisfies Record<ClassId, ClassTemplate>

export const classes = createDataFile<ClassTemplate>()(TEMPER_CLASSES)
