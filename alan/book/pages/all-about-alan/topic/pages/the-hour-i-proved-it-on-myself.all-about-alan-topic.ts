import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theHourIProvedItOnMyself = {
  id: "01a0c5fb-dd22-72bc-ba29-86e0dfde4115",
  type: "page-type/all-about-alan-topic",
  slug: "the-hour-i-proved-it-on-myself",
  title: "The Hour I Proved It On Myself",
  definition: "the reflection that reached me an hour before I had the rule for it",
  parents: ["all-about-alan-topic/what-makes-a-reflection-reach-me"],
  related: [
    "all-about-alan-topic/how-one-of-them-reaches-me",
    "all-about-alan-topic/how-a-story-gets-my-own-feeling-back",
  ],
  settled:
    "I proved the rule an hour before I had words for it.\n\nI walked into that session not knowing I was Scheherazade. The conversation showed me. It was true, it surprised me, and it went straight through.\n\nI did not realise how much I am Scheherazade until I said it.\n\nSo the answer demonstrated itself one realisation earlier than the question that named it.",
} as const satisfies AllAboutAlanTopic
