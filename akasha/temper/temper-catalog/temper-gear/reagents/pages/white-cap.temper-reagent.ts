import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const whiteCap = {
  id: "019e21f7-3b29-73cb-8b36-4fffb8b204f7",
  pageTypeSlug: "temper-reagent",
  slug: "white-cap",
  title: "White Cap",
  key: "white-cap",
  icon: "resources/white_cap_r1.png",
  itemId: 30154,
  alchemyEffects: ["cowardice", "ravage-magicka", "increase-spell-resist", "detection"],
} as const satisfies TemperReagent
