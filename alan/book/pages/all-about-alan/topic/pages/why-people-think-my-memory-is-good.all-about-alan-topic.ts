import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const whyPeopleThinkMyMemoryIsGood = {
  id: "01a0c5a5-0f92-79ab-b540-000b07196405",
  type: "page-type/all-about-alan-topic",
  slug: "why-people-think-my-memory-is-good",
  title: "Why People Think My Memory Is Good",
  definition: "recognition standing in for recall, and the working memory it hides",
  parents: ["all-about-alan-topic/how-i-remember-anything"],
  related: [
    "all-about-alan-topic/what-running-myself-breaks-into",
    "all-about-alan-topic/why-high-functioning-is-the-wrong-word",
  ],
  settled:
    "Typical working memory holds about five chunks, give or take two. Mine holds one to three, so roughly half of normal.\n\nPeople often think my memory is excellent. What they are seeing is recognition rather than recall. Given a reference I recognise it and pull a wide net of associated context along with it.\n\nMemory and recall get treated as one thing, so the strong half covers for the weak half and the gap never shows from outside.",
} as const satisfies AllAboutAlanTopic
