import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howICameOutOfComputerScience = {
  id: "01a047c8-d163-726a-89e6-0c342fdaec12",
  type: "page-type/all-about-alan-topic",
  slug: "how-i-came-out-of-computer-science",
  title: "How I Came Out Of Computer Science",
  definition: "the trade I trained out of rather than into",
  parents: ["all-about-alan-topic/being-an-inventor-not-a-coder"],
  related: [
    "all-about-alan-topic/the-code-in-my-family",
    "all-about-alan-topic/why-i-stopped-working",
  ],
  settled:
    "I was a programmer in one form or another professionally for eighteen years.\n\nI put computer science as my major on my college application, and then changed it the first day of school.\n\nI went through eleven different majors and ended on Math.\n\nI only took one CS course, and finished it in a week. The whole semester's work went through an automated checker, with no person's verdict in the loop, so no judge was ever installed on code. That is why code's judge stayed outside me for life.",
} as const satisfies AllAboutAlanTopic
