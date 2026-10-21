import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theChildSayingIHateMyself = {
  id: "01a15e9a-a518-7a01-a6e6-debfb3760533",
  type: "page-type/all-about-alan-topic",
  slug: "the-child-saying-i-hate-myself",
  title: "The Child Saying I Hate Myself",
  definition: 'who says "I hate myself" after a conversation, and to whom',
  parents: ["all-about-alan-topic/punished-by-my-other-half"],
  related: [
    "all-about-alan-topic/hating-myself-after-a-conversation",
    "all-about-alan-topic/the-professor-and-the-child",
    "all-about-alan-topic/how-jen-connects-through-words",
  ],
  settled:
    'I think "I hate myself" is really the Child talking to the Professor, saying "I hate how your choices are affecting me."\n\nOn the night of 20 October 2026 the conversation with Jen left me completely exhausted, and afterwards she held me in silence. I do not think the verdict came after that.',
  createdAt: "2026-10-21T13:15:55.543Z",
  updatedAt: "2026-10-21T13:15:55.543Z",
} as const satisfies AllAboutAlanTopic
