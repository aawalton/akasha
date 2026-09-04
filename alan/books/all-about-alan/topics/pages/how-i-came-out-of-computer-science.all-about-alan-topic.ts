import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howICameOutOfComputerScience = {
  id: "01a047c8-d163-726a-89e6-0c342fdaec12",
  pageTypeSlug: "all-about-alan-topic",
  slug: "how-i-came-out-of-computer-science",
  title: "How I Came Out Of Computer Science",
  definition: "the trade I trained out of rather than into",
  parentSlugs: ["being-an-inventor-not-a-coder"],
  relatedSlugs: ["the-code-in-my-family", "why-i-stopped-working"],
  settled:
    "I was a programmer in one form or another professionally for eighteen years.\n\nI put computer science as my major on my college application, and then changed it the first day of school.\n\nI went through eleven different majors and ended on Math.\n\nI only took one CS course, and finished it in a week.",
  unsettled:
    "The eleven majors are a count with no list. What they were, and what moved me off each, is unwritten.",
} as const satisfies AllAboutAlanTopic
