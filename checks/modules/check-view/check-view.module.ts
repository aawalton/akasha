import type { Module } from "@akasha/code-system/module"

export const checkView = {
  id: "01a06949-b281-72b1-a26e-89c9bcd472da",
  pageTypeSlug: "module",
  slug: "check-view",
  definition:
    "what a check is given of a repo, with the markdown documents under a root found once",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A document is a markdown file beneath the root.",
    },
    {
      invariantKind: "departure",
      statement: "A path under .git is never a document.",
    },
    {
      invariantKind: "departure",
      statement: "A vendored path is never a document.",
    },
    {
      invariantKind: "departure",
      statement: "A file holding an attachment or rows is never a document.",
    },
    {
      invariantKind: "departure",
      statement: "Documents come back sorted by path.",
    },
    {
      invariantKind: "departure",
      statement: "The documents under a root are found once in a call and reused.",
    },
  ],
} as const satisfies Module
