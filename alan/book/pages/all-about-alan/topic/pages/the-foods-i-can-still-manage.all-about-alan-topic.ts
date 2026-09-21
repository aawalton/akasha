import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theFoodsICanStillManage = {
  id: "01a06559-9d65-7cc2-adc2-4be6e81bc574",
  type: "page-type/all-about-alan-topic",
  slug: "the-foods-i-can-still-manage",
  title: "The Foods I Can Still Manage",
  definition: "the small set that holds when all four bars are low",
  parents: ["all-about-alan-topic/how-i-eat"],
  settled:
    "A food has to be bland, quick, dense and safe to finish. Nothing is in the set for pleasure.\n\nThe four are what each bar needs. Bland spares my nervous system, quick spares my mana, dense is what actually feeds me, and safe to finish means no meal is abandoned halfway.\n\nMissing any one keeps a food out, however good it tastes when I have capacity.\n\nThere is no rotation. I take whichever one is reachable in the moment. The work of deciding what qualifies happens beforehand, so at the meal I only pick from the set and never weigh a new candidate.\n\nAt crisis-low the dishware goes disposable, so cleanup costs nothing.\n\nThe muesli I found in Russia at twenty is my one reliable self-started meal, and it works every time.\n\nAt two or below there is nothing in my room I can get myself to eat, because the wanting has to fund the reaching.\n\nThe autism community calls these safe foods. Mine are picked on more than being safe to finish.",
} as const satisfies AllAboutAlanTopic
