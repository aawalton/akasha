import type { Module } from "@akasha/code-system/module"

export const fileWriteBacking = {
  id: "01a05bd6-c531-7dd0-9e35-b1874e0c45e5",
  pageTypeSlug: "module",
  slug: "file-write-backing",
  definition: "which page types are backed by files, and where those files are",
  code: "ts",
  invariants: [
    {
      invariantKind: "gap",
      statement: "The roster is always answered unread.",
    },
    {
      invariantKind: "absence",
      statement:
        "`@akasha/pages-system-service` says nothing about where a page type's files are kept.",
    },
    {
      invariantKind: "departure",
      statement: "Placing a page type's pages refuses and writes nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal says a page is placed from the index rather than from a glob a caller hands over.",
    },
    {
      invariantKind: "absence",
      statement: "An empty roster is never answered as a roster that was read.",
    },
  ],
} as const satisfies Module
