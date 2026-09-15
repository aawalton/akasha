import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const showingHerSheComesFirst = {
  id: "01a06559-9d65-7591-8952-1246db36369f",
  type: "page-type/all-about-alan-topic",
  slug: "showing-her-she-comes-first",
  title: "Showing Her She Comes First",
  definition: "she is ranked first and it does not show, so I say the trade out loud",
  parents: ["all-about-alan-topic/living-with-jen"],
  settled:
    "The ranking is built and declared. What was missing is a price on the trades I actually make.",
} as const satisfies AllAboutAlanTopic
