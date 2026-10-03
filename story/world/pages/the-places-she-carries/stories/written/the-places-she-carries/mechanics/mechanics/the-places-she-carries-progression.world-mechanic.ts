import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const thePlacesSheCarriesProgression = {
  id: "01a10337-ad0b-71b5-9769-8d0b7d8023d9",
  type: "page-type/world-mechanic",
  slug: "the-places-she-carries-progression",
  title: "Progression",
  world: "world/the-places-she-carries",
  description:
    "The System names a person's class at their Naming and shows them stat screens. Experience is earned from discoveries, bonds, crafting and firsts, and counts up without resetting; a level is reached at a total, Level 6 at 2573 and Level 7 at 3200. A level can grant stats outright and gives free stat points to place; an achievement can grant a stat for good. Twelve stats in four groups: Physical (VIT, END, DEX), Mental (PER, FOC, MEM), Social (EMP, PRE, RSV) and Exploration (ATT, PTH, ADP).",
} as const satisfies WorldMechanic
