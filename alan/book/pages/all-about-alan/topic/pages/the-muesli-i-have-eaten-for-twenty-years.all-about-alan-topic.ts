import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theMuesliIHaveEatenForTwentyYears = {
  id: "01a0c59e-6a49-768f-9401-d6253b667d01",
  type: "page-type/all-about-alan-topic",
  slug: "the-muesli-i-have-eaten-for-twenty-years",
  title: "The Muesli I Have Eaten For Twenty Years",
  definition: "the one full meal I reliably start myself, and what it is made of",
  parents: ["all-about-alan-topic/the-foods-i-can-still-manage"],
  settled:
    "Organic Winco muesli, Costco mixed nuts, and orange juice instead of milk, eaten like cereal.\n\nI found it on my mission in Russia at twenty and have eaten it steadily for about twenty years. It works every time, and it is the one full meal I reliably start myself.\n\nThe only barrier is about thirty seconds of preparation. I tried pre-portioning it and that turned out to be more work rather than less. The recipe is where twenty years of optimising arrived.",
} as const satisfies AllAboutAlanTopic
