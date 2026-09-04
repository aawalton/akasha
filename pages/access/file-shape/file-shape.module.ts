import type { Module } from "@akasha/code-system/module"

export const fileShape = {
  id: "01a05bd6-c531-7062-bc98-1b9ed3fd2560",
  pageTypeSlug: "module",
  slug: "file-shape",
  definition: "the shape a file-backed page's page type declares",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page type's slug is found by asking `@akasha/pages-system-service` for the type carrying an id.",
    },
    {
      invariantKind: "departure",
      statement: "A slug once found is answered again without asking.",
    },
    {
      invariantKind: "departure",
      statement: "A question the pages refuse is dropped rather than held as the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A page type carrying no such id is answered as nothing and that answer is kept.",
    },
    {
      invariantKind: "gap",
      statement: "A page type's shape refuses.",
    },
    {
      invariantKind: "absence",
      statement: "What a page type declares goes unread here.",
    },
  ],
} as const satisfies Module
