import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const theGraphIBuiltToRunMyChecks = {
  id: "01a04625-d809-7468-9ddd-c403fc72d67e",
  pageTypeSlug: "all-about-alan-topic",
  slug: "the-graph-i-built-to-run-my-checks",
  title: "The Graph I Built To Run My Checks",
  definition: "the typed graph my checks are defined on, and what made me build it",
  parentSlugs: ["how-many-checks-i-run"],
  relatedSlugs: [
    "when-my-docs-are-my-code",
    "how-my-services-decide-to-deploy",
    "what-the-graph-is-made-of",
  ],
  settled:
    "At about a hundred checks, performance became the problem.\n\nI solved it by constructing a typed graph — nodes and edges, with node types and edge types.\n\nBasically all the checks are invariant predicates defined on that graph, and the conditions for which changes they should run on are also predicates on that graph.\n\nBuilding the graph once and using it many times solved the performance issue.\n\nI have not heard anyone else talk about that.",
  unsettled:
    "What building the graph costs, and whether that cost grows with the number of checks or only with the size of the tree, is unrecorded.\n\nWhether anyone else has built this and not talked about it is unchecked. I have only said I have not heard it.",
} as const satisfies AllAboutAlanTopic
