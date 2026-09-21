import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const myInformationDiet = {
  id: "01a0c5a7-54be-70d4-85d8-11e23c6b89c6",
  type: "page-type/all-about-alan-topic",
  slug: "my-information-diet",
  title: "My Information Diet",
  definition: "the categories of consuming I stopped rather than found a better provider for",
  parents: ["all-about-alan-topic/what-i-take-in"],
  related: [
    "all-about-alan-topic/not-needing-the-thing-at-all",
    "all-about-alan-topic/where-my-reading-comes-from",
  ],
  settled:
    "No news, no podcasts, and almost no social platform used for information. Those whole categories are gone rather than moved to a better provider.\n\nThree things make that work for me.\n\nA low-stimulation life costs me less overwhelm and less decision fatigue, and a feed or an outrage cycle is built to be high stimulation.\n\nSaving cognitive load is part of recovering from burnout rather than a nicety, and what I take in is the easiest discretionary load there is to drop.\n\nAnd the fear of missing something is real, while what half an hour of news a day would change about any decision we actually make is close to nothing.\n\nIt is sparse on purpose rather than empty by default.",
} as const satisfies AllAboutAlanTopic
