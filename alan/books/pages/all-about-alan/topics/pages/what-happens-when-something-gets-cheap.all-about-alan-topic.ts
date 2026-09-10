import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.types.ts"

export const whatHappensWhenSomethingGetsCheap = {
  id: "01a04625-d80b-7391-a0f8-608f2ec324ec",
  pageTypeSlug: "all-about-alan-topic",
  type: "all-about-alan-topic",
  slug: "what-happens-when-something-gets-cheap",
  title: "What Happens When Something Gets Cheap",
  definition: "the move behind every system I built this year",
  parents: ["the-scaffolding-i-built"],
  related: ["why-i-rebuilt-everything", "how-many-checks-i-run", "the-shape-behind-the-two-lines"],
  settled:
    "Docs became cheap, so I built the domain system and the pages system.\n\nChecks became cheap, so I built the graph system, the checks system and the deploy system.",
} as const satisfies AllAboutAlanTopic
