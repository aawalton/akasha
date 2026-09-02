import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const namirasRot = {
  id: "01a05fd8-a455-7ba8-aa18-250f69d8d7c5",
  pageTypeSlug: "temper-reagent",
  slug: "namiras-rot",
  title: "Namira's Rot",
  key: "namiras-rot",
  icon: "resources/namiras_rot_r1.png",
  itemId: 30153,
  alchemyEffects: ["spell-critical", "speed", "invisible", "unstoppable"],
} as const satisfies TemperReagent
