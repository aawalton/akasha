import type { Domain } from "../../domain-system/domain/domain.page-type.ts"

export const index = {
  id: "01a04a4a-23e9-7114-90a5-11acf49a937d",
  pageTypeSlug: "domain",
  slug: "index",
  definition: "which file holds each page, and which pages name it",
  partSlugs: ["index-identity", "index-relation", "indexing"],
  requiredReadingSlugs: ["domain/index-identity", "domain/index-relation"],
  design: [
    "An index file is named for the value it answers.",
    "A value no page carries has no file.",
    "A question the index answers is one file read, never a walk.",
    "A directory is divided into no buckets.",
    "The index is written by the door and by nothing else.",
    "A page property held in its own file is not indexed.",
  ],
  condition: ["The index holds every page."],
  intent: [
    "No page's entry is older than the files its properties hold.",
    "Nothing in the index differs from the pages.",
  ],
} as const satisfies Domain
