import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const namirasRot = {
  id: "019e21f7-3b20-729b-ae00-34c60476efd2",
  type: "page-type/temper-reagent",
  slug: "namiras-rot",
  title: "Namira's Rot",
  key: "namiras-rot",
  icon: "resources/namiras_rot_r1.png",
  itemId: 30153,
  alchemyEffects: [
    "temper-poison-effect/spell-critical",
    "temper-poison-effect/speed",
    "temper-poison-effect/invisible",
    "temper-poison-effect/unstoppable",
  ],
} as const satisfies TemperReagent
