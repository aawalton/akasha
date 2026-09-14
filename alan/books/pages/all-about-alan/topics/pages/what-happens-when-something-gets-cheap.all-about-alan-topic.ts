import type { AllAboutAlanTopic } from "akasha/alan/books/pages/all-about-alan/topics/all-about-alan-topic.page-type.types.ts"

export const whatHappensWhenSomethingGetsCheap = {
  id: "01a04625-d80b-7391-a0f8-608f2ec324ec",
  type: "all-about-alan-topic",
  slug: "what-happens-when-something-gets-cheap",
  title: "What Happens When Something Gets Cheap",
  definition: "the move behind every system I built this year",
  parents: ["the-scaffolding-i-built"],
  related: [
    "all-about-alan-topic/why-i-rebuilt-everything",
    "all-about-alan-topic/how-many-checks-i-run",
    "all-about-alan-topic/the-shape-behind-the-two-lines",
  ],
  settled:
    "Docs became cheap, so I built the domain system and the pages system.\n\nChecks became cheap, so I built the graph system, the checks system and the deploy system.",
} as const satisfies AllAboutAlanTopic
