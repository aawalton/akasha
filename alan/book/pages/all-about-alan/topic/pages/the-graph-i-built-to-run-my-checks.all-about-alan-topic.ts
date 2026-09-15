import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theGraphIBuiltToRunMyChecks = {
  id: "01a04625-d809-7468-9ddd-c403fc72d67e",
  type: "page-type/all-about-alan-topic",
  slug: "the-graph-i-built-to-run-my-checks",
  title: "The Graph I Built To Run My Checks",
  definition: "the typed graph my checks are defined on, and what made me build it",
  parents: ["all-about-alan-topic/how-many-checks-i-run"],
  related: [
    "all-about-alan-topic/when-my-docs-are-my-code",
    "all-about-alan-topic/how-my-services-decide-to-deploy",
    "all-about-alan-topic/what-the-graph-is-made-of",
  ],
  settled:
    "At about a hundred checks, performance became the problem.\n\nI solved it by constructing a typed graph — nodes and edges, with node types and edge types.\n\nBasically all the checks are invariant predicates defined on that graph, and the conditions for which changes they should run on are also predicates on that graph.\n\nBuilding the graph once and using it many times solved the performance issue.\n\nI have not heard anyone else talk about that.",
} as const satisfies AllAboutAlanTopic
