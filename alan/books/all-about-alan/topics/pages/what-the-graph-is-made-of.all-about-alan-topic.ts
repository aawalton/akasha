import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whatTheGraphIsMadeOf = {
  id: "01a047c8-d165-7dc6-a4d7-12800519c6af",
  pageTypeSlug: "all-about-alan-topic",
  slug: "what-the-graph-is-made-of",
  title: "What The Graph Is Made Of",
  definition: "the parts of the graph system, and where each is derived from",
  parentSlugs: ["the-graph-i-built-to-run-my-checks"],
  settled:
    "It is a whole system now, which is why I call it the graph system: nodes, edges, attributes, producers, queries.\n\nParts of it are derived from pages, parts from the filesystem, parts from code, and parts from other places.",
  unsettled:
    "Where the graph draws from something other than pages, the filesystem or code is unlisted.",
} as const satisfies AllAboutAlanTopic
