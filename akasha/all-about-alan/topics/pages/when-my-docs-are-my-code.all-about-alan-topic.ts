import type { AllAboutAlanTopic } from "../all-about-alan-topic.page-type.ts"

export const whenMyDocsAreMyCode = {
  id: "01a04615-3060-7c9d-baa6-90b37783964f",
  pageTypeSlug: "all-about-alan-topic",
  slug: "when-my-docs-are-my-code",
  title: "When My Docs Are My Code",
  definition: "what changes once my data, my docs and my code are one thing",
  parentSlugs: ["why-i-keep-my-data-in-files"],
  relatedSlugs: ["the-graph-i-built-to-run-my-checks", "what-changes-when-i-change-a-doc"],
  settled:
    "More of the system is defined in structured agent-readable documents, and in many cases the code runs directly off the documentation.\n\nData, docs and code being the same thing is a whole different universe from where software products have lived in the past, with the three separate.\n\nIt is necessary. When the system is primarily agent-driven, all three need to be agent-accessible first, and all other considerations are secondary.",
  unsettled:
    "What else falls out of the new constraints that the old system could not have given me at any price is what I am still figuring out.",
} as const satisfies AllAboutAlanTopic
