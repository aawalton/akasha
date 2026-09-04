import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whatMyScaffoldingBuysMe = {
  id: "01a06559-9d65-7358-81b2-e2e08ee15a62",
  pageTypeSlug: "all-about-alan-topic",
  slug: "what-my-scaffolding-buys-me",
  title: "What My Scaffolding Buys Me",
  definition:
    "the strengths my harness gets to a finish that my executive function could not carry alone",
  parentSlugs: ["the-scaffolding-i-built"],
  relatedSlugs: ["how-i-get-anything-done", "how-different-i-actually-am"],
  settled:
    "It routes four things into work: hyperfocus, depth across several streams at once, systematic precision, and how far my pattern recognition reaches.\n\nWithout it those sit behind an executive function that cannot get them to a finish.",
  unsettled:
    "Which projects it actually did this for is uncollected, so the routing stands with no instances behind it.\n\nWhether throwing raw hours at it still fires under acute overload, and whether the long days are that rather than leverage, is unprobed.",
} as const satisfies AllAboutAlanTopic
