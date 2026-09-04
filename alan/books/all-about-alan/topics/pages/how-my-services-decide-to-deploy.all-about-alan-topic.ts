import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const howMyServicesDecideToDeploy = {
  id: "01a04625-d80a-7cfd-9b51-484dfd18b410",
  pageTypeSlug: "all-about-alan-topic",
  slug: "how-my-services-decide-to-deploy",
  title: "How My Services Decide To Deploy",
  definition: "how a deploy gets decided, and the CI I had to build to run it",
  parentSlugs: ["the-graph-i-built-to-run-my-checks"],
  settled:
    "Whether a service needs to deploy is also a predicate over the graph, so the graph is solving my deploy throughput problem too.\n\nI broke GitHub's team plan as an individual in January.\n\nI ended up building an entire custom CI system on Kubernetes from scratch.\n\nI am now growing past that to continuous deploy based on graph changes.",
  unsettled:
    "What exactly broke in the team plan, and what the limit was, is unwritten.\n\nWhat continuous deploy on graph changes still needs before it is running is not listed.",
} as const satisfies AllAboutAlanTopic
