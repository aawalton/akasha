import { createDataFile } from "@akasha/utils-narrow/create-data-file"

interface SourceCategoryTemplate {
  id: string
  name: string
  displayOrder: number
}

export const TEMPER_SOURCE_CATEGORY_DATA = {
  "base": { id: "base" as const, name: "Base Stats", displayOrder: 1 },
  "attributes": { id: "attributes" as const, name: "Attributes", displayOrder: 2 },
  "armor": { id: "armor" as const, name: "Armor", displayOrder: 3 },
  "jewelry": { id: "jewelry" as const, name: "Jewelry", displayOrder: 4 },
  "weapons": { id: "weapons" as const, name: "Weapons", displayOrder: 5 },
  "sets": { id: "sets" as const, name: "Sets", displayOrder: 6 },
  "food-or-drink": { id: "food-or-drink" as const, name: "Food / Drink", displayOrder: 7 },
  "potions": { id: "potions" as const, name: "Potions", displayOrder: 8 },
  "poisons": { id: "poisons" as const, name: "Poisons", displayOrder: 9 },
  "mundus": { id: "mundus" as const, name: "Mundus Stone", displayOrder: 10 },
  "champion-points": { id: "champion-points" as const, name: "Champion Points", displayOrder: 11 },
  "skills": { id: "skills" as const, name: "Skills", displayOrder: 12 },
  "buffs": { id: "buffs" as const, name: "Buffs", displayOrder: 13 },
  "debuffs": { id: "debuffs" as const, name: "Debuffs", displayOrder: 14 },
  "target": { id: "target" as const, name: "Target", displayOrder: 15 },
  "account": { id: "account" as const, name: "Account", displayOrder: 16 },
  "curse": { id: "curse" as const, name: "Curse", displayOrder: 17 },
  "companion-base": {
    id: "companion-base" as const,
    name: "Companion Base Stats",
    displayOrder: 19,
  },
  "companion-armor": { id: "companion-armor" as const, name: "Companion Armor", displayOrder: 20 },
  "companion-weapons": {
    id: "companion-weapons" as const,
    name: "Companion Weapons",
    displayOrder: 21,
  },
  "companion-jewelry": {
    id: "companion-jewelry" as const,
    name: "Companion Jewelry",
    displayOrder: 22,
  },
  "companion-skills": {
    id: "companion-skills" as const,
    name: "Companion Skills",
    displayOrder: 23,
  },
} satisfies Record<string, SourceCategoryTemplate>

export const sourceCategories = createDataFile<SourceCategoryTemplate>()(
  TEMPER_SOURCE_CATEGORY_DATA
)

export type SourceCategoryId = (typeof sourceCategories.ids)[number]
