import type { TemperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.types.ts"

export const spiderEgg = {
  id: "019e21f7-3b24-73f5-9872-99b465b90f46",
  type: "page-type/temper-reagent",
  slug: "spider-egg",
  title: "Spider Egg",
  key: "spider-egg",
  icon: "resources/reagent_spider_egg.png",
  itemId: 77584,
  alchemyEffects: [
    "temper-poison-effect/hindrance",
    "temper-poison-effect/invisible",
    "temper-poison-effect/lingering-health",
    "temper-poison-effect/defile",
  ],
  createdAt: "2026-05-13T15:31:51.204Z",
  updatedAt: "2026-09-22T13:24:25.000Z",
} as const satisfies TemperReagent
