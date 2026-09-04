import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whyIRebuiltEverything = {
  id: "01a04615-305d-74ac-9bd3-68083fd2e2d5",
  pageTypeSlug: "all-about-alan-topic",
  slug: "why-i-rebuilt-everything",
  title: "Why I Rebuilt Everything",
  definition: "what a better model did to the system I already had",
  parentSlugs: ["the-scaffolding-i-built"],
  relatedSlugs: [
    "why-i-keep-my-data-in-files",
    "how-i-watch-my-agents",
    "how-often-i-start-over",
    "what-happens-when-something-gets-cheap",
  ],
  settled:
    "Opus 5 released about a month before the end of August 2026, much better at finding, following and writing instructions.\n\nMy three million lines of code and docs were just too much, and everything ground to a halt.\n\nEverything I have built since has been figuring out how to make the environment clean and consistent, with the right context available for the agent at the right time.\n\nAll three of those matter. None of them carries it alone.\n\nI have got rid of about a million lines so far.",
  unsettled:
    "How much more of the three million has to go is not settled. I have only said I need to get rid of more.\n\nThe right context at the right time is not quite right yet. Abby's reading: on 27 August an agent of mine held every domain governing its seat and still had to be told by me that the book about me existed.\n\nWhether the halt came from the sheer volume or from how much of it had gone stale is not separated.",
} as const satisfies AllAboutAlanTopic
