import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const impStool = {
  id: "01a05fd8-a453-7009-ac04-af7844280a52",
  pageTypeSlug: "temper-reagent",
  slug: "imp-stool",
  title: "Imp Stool",
  key: "imp-stool",
  icon: "resources/imp_stool_r2.png",
  itemId: 30156,
  alchemyEffects: ["maim", "ravage-stamina", "increase-armor", "enervation"],
} as const satisfies TemperReagent
