import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theThreeItchesICameWith = {
  id: "01a0c59e-84d0-71f7-b04b-af53175e9268",
  type: "page-type/all-about-alan-topic",
  slug: "the-three-itches-i-came-with",
  title: "The Three Itches I Came With",
  definition: "the given wants, one to each part of me, and how loudly the mind's one fires",
  parents: ["all-about-alan-topic/how-a-want-fires"],
  related: [
    "all-about-alan-topic/the-three-parts-of-me",
    "all-about-alan-topic/writing-a-new-want-into-myself",
  ],
  settled:
    "Three come given, one to a part of me. Hunger is the body's, loneliness the feeling's, needless complexity the mind's.\n\nEach fires as desire or as irritation rather than as a judgment I arrive at.\n\nThe mind's fires at body grade. Needless complexity itches at me the way hunger does. It is not a calm preference for things being tidy.\n\nSo the conceptual half of me has appetites of its own. It is not a dispassionate onlooker holding opinions.",
} as const satisfies AllAboutAlanTopic
