import type { Domain } from "../../domain-system/domain/domain.page-type.ts"

export const index = {
  id: "01a04a4a-23e9-7114-90a5-11acf49a937d",
  pageTypeSlug: "domain",
  slug: "index",
  definition:
    "which file holds each page, which pages name it, which files import it, and what shape each property holds",
  partSlugs: [
    "domain/index-identity",
    "domain/index-relation",
    "domain/index-schema",
    "domain/index-import",
    "module/index-entries",
    "module/indexing",
    "module/index-reading",
  ],
  requiredReadingSlugs: [],
  design: [
    {
      invariantKind: "departure",
      statement: "An index file is named for the value it answers.",
    },
    {
      invariantKind: "absence",
      statement: "A value no page carries has no file.",
    },
    {
      invariantKind: "departure",
      statement: "A question the index answers is one file read, never a walk.",
    },
    {
      invariantKind: "absence",
      statement: "A directory is divided into no buckets.",
    },
    {
      invariantKind: "departure",
      statement: "The index is written by the door and by nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A path in the index is relative to the repository root.",
    },
  ],
  condition: ["The index holds every page."],
  intent: [
    {
      invariantKind: "gap",
      statement: "No page's entry is older than the files its properties hold.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing in the index differs from the pages.",
    },
  ],
} as const satisfies Domain
