import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const whiteCap = {
  id: "01a05fd8-a458-7637-a4f9-8cd458376dc8",
  pageTypeSlug: "temper-reagent",
  slug: "white-cap",
  title: "White Cap",
  key: "white-cap",
  icon: "resources/white_cap_r1.png",
  itemId: 30154,
  alchemyEffects: ["cowardice", "ravage-magicka", "increase-spell-resist", "detection"],
} as const satisfies TemperReagent
