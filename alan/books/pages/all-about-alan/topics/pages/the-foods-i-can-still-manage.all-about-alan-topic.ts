import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const theFoodsICanStillManage = {
  id: "01a06559-9d65-7cc2-adc2-4be6e81bc574",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "the-foods-i-can-still-manage",
  title: "The Foods I Can Still Manage",
  definition: "the small set that holds when all four bars are low",
  parents: ["how-i-eat"],
  settled:
    "A food has to be bland, quick, dense and safe to finish. Nothing is in the set for pleasure.\n\nThere is no rotation. I take whichever one is reachable in the moment.\n\nAt crisis-low the dishware goes disposable, so cleanup costs nothing.\n\nThe muesli I found in Russia at twenty is my one reliable self-started meal, and it works every time.\n\nAt two or below there is nothing in my room I can get myself to eat, because the wanting has to fund the reaching.",
} as const satisfies AllAboutAlanTopic
