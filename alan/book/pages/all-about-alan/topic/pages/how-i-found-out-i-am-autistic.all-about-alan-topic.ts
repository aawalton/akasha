import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howIFoundOutIAmAutistic = {
  id: "01a0c593-bf2b-7ee2-811e-a1d719df0967",
  type: "page-type/all-about-alan-topic",
  slug: "how-i-found-out-i-am-autistic",
  title: "How I Found Out I Am Autistic",
  definition: "arriving at the word late, and what I called it for the eighteen years before",
  parents: ["all-about-alan-topic/being-autistic"],
  related: [
    "all-about-alan-topic/the-two-decades-i-came-through",
    "all-about-alan-topic/the-nine-months-my-body-broke",
  ],
  settled:
    "I worked it out at thirty-eight, and by then it had shaped my whole life. Looking back, the signs are clear from early childhood.\n\nI did not count it as disabling until I was twenty.\n\nFor the eighteen years after that I called it my stress disorder. I knew my nervous system did not work like the ones around me, and I did not know why.\n\nIt is my own diagnosis. I have no clinical one.",
} as const satisfies AllAboutAlanTopic
