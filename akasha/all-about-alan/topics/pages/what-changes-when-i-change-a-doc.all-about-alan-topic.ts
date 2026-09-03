import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whatChangesWhenIChangeADoc = {
  id: "01a047c8-d167-7e81-b2dc-fd5adc1cf6b2",
  pageTypeSlug: "all-about-alan-topic",
  slug: "what-changes-when-i-change-a-doc",
  title: "What Changes When I Change A Doc",
  definition: "what a documentation change sets off, and how I work out how far it reaches",
  parentSlugs: ["when-my-docs-are-my-code"],
  relatedSlugs: ["the-graph-i-built-to-run-my-checks"],
  settled:
    'Running the code off the documentation helps keep them aligned.\n\nWhen the documentation changes, the code might change.\n\nI need granular cache invalidation at scale, so I can answer questions like "with this file change, which checks need to run and which services need to deploy?"\n\nThat answer comes primarily from a set of git oids and some cached edges between nodes in the graph system.',
  unsettled: "What the invalidation still gets wrong, and how I would find out, is unrecorded.",
} as const satisfies AllAboutAlanTopic
