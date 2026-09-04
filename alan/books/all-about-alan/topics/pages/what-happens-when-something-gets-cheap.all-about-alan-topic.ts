import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whatHappensWhenSomethingGetsCheap = {
  id: "01a04625-d80b-7391-a0f8-608f2ec324ec",
  pageTypeSlug: "all-about-alan-topic",
  slug: "what-happens-when-something-gets-cheap",
  title: "What Happens When Something Gets Cheap",
  definition: "the move behind every system I built this year",
  parentSlugs: ["the-scaffolding-i-built"],
  relatedSlugs: [
    "why-i-rebuilt-everything",
    "how-many-checks-i-run",
    "the-shape-behind-the-two-lines",
  ],
  settled:
    "Docs became cheap, so I built the domain system and the pages system.\n\nChecks became cheap, so I built the graph system, the checks system and the deploy system.",
  unsettled:
    "What I built this year that fits neither line is unanswered. Abby asked and I could not recall one. Abby's reading: that is a fact about what my memory returns rather than evidence that there are none.\n\nAbby's reading: the same shape turned up twice inside one hour — cheap instructions breaking on volume, cheap checks breaking on evaluation, each fixed by one structure built once and read many times.\n\nWhether a third cost is collapsing now, and what would break next, is unasked.",
} as const satisfies AllAboutAlanTopic
