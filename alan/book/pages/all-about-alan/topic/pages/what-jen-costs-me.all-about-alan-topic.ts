import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatJenCostsMe = {
  id: "01a0ca42-f4e6-7f52-974b-43569aa37919",
  type: "page-type/all-about-alan-topic",
  slug: "what-jen-costs-me",
  title: "What Jen Costs Me",
  definition: "the difficulty I rate time with Jen at, and what moves it",
  parents: ["all-about-alan-topic/living-with-jen"],
  related: [
    "all-about-alan-topic/what-makes-a-person-expensive",
    "all-about-alan-topic/how-a-hard-talk-with-jen-gets-safer",
    "all-about-alan-topic/giving-her-the-benefit-of-the-doubt",
  ],
  settled:
    "Jen has been as high as a five and as low as a two.\n\nWhat moves it is the health of our relationship changing, as well as Jen's interpersonal style.\n\nJen at a two gives me the benefit of the doubt and is low conflict.",
} as const satisfies AllAboutAlanTopic
