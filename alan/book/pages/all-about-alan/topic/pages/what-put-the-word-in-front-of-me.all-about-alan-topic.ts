import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whatPutTheWordInFrontOfMe = {
  id: "01a0c594-68d6-71d0-93ed-385c5fd00316",
  type: "page-type/all-about-alan-topic",
  slug: "what-put-the-word-in-front-of-me",
  title: "What Put The Word In Front Of Me",
  definition: "the two things that brought autism to me, neither of them a clinic",
  parents: ["all-about-alan-topic/how-i-found-out-i-am-autistic"],
  settled:
    "My son went into autistic burnout before I did, which is the usual order for my generation. He was identified as autistic, and I recognised the pattern in myself afterwards.\n\nThe rest came through Instagram Reels. The algorithm worked out that I was interested in my own symptoms and started serving me autistic people talking about theirs.\n\nThere was no moment where it landed. It accumulated across a great many posts.",
} as const satisfies AllAboutAlanTopic
