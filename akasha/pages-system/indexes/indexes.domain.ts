import type { Domain } from "../../domain-system/domain/domain.page-type.ts"

export const indexes = {
  id: "01a04a4a-23e9-7114-90a5-11acf49a937d",
  pageTypeSlug: "domain",
  slug: "indexes",
  definition: "the indexes the pages are read through, each answering one question of the corpus",
  partSlugs: [
    "index/index-identity",
    "index/index-relation",
    "index/index-schema",
    "index/index-import",
    "index/index-path",
    "page-type/index",
    "module/index-entries",
    "module/indexing",
    "module/index-reading",
    "module/index-surface",
    "module/index-stamp",
    "module/generated-properties",
    "module/reaching",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The index is written under `.git/data`.",
    },
    {
      invariantKind: "departure",
      statement: "Git does not track `.git/data`.",
    },
    {
      invariantKind: "departure",
      statement: "The index can be written again from the pages alone.",
    },
    {
      invariantKind: "departure",
      statement: "An index file is named for the value it answers.",
    },
    {
      invariantKind: "departure",
      statement: "An index file's name closes with `.jsonl`.",
    },
    {
      invariantKind: "departure",
      statement: "The file carries one answer to a line.",
    },
    {
      invariantKind: "departure",
      statement: "An index's answers are filed under a folder named for it.",
    },
    {
      invariantKind: "departure",
      statement: "That folder is read from the index's own page.",
    },
    {
      invariantKind: "departure",
      statement: "An index answers one question of the corpus.",
    },
    {
      invariantKind: "absence",
      statement: "A value no page carries has no file.",
    },
    {
      invariantKind: "departure",
      statement: "A question the index answers is one file read rather than a walk.",
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
    {
      invariantKind: "departure",
      statement: "The index names the commit it describes.",
    },
    {
      invariantKind: "stopgap",
      statement: "The index holds every page.",
    },
    {
      invariantKind: "gap",
      statement: "No page's entry is older than the files its properties hold.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing in the index differs from the pages.",
    },
    {
      invariantKind: "gap",
      statement: "Only what imports a file is refused when the index does not describe HEAD.",
    },
  ],
} as const satisfies Domain
