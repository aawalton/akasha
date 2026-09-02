import type { TemperReagent } from "../temper-reagent.page-type.ts"

export const columbine = {
  id: "01a05fd8-a451-728f-9b2b-108b1a6f1276",
  pageTypeSlug: "temper-reagent",
  slug: "columbine",
  title: "Columbine",
  key: "columbine",
  icon: "resources/columbine_r1.png",
  itemId: 30164,
  alchemyEffects: ["restore-health", "restore-magicka", "restore-stamina", "unstoppable"],
} as const satisfies TemperReagent
