import type { Module } from "@akasha/code-system/module"

export const fileBacking = {
  id: "01a05b69-4540-715d-a1fb-2ce95dde8cb6",
  pageTypeSlug: "module",
  slug: "file-backing",
  definition: "which page types are kept in files rather than in the database",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The roster names the page types kept in files and no others.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the roster does not name is answered unknown rather than database.",
    },
    {
      invariantKind: "departure",
      statement: "A road to a page type's pages is never guessed.",
    },
    {
      invariantKind: "gap",
      statement: "What backs a page type the roster leaves out is read from somewhere.",
    },
  ],
} as const satisfies Module
