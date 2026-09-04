import type { Module } from "@akasha/code-system/module"

export const pageWriting = {
  id: "01a05abd-fe05-794d-8493-811846971bf6",
  pageTypeSlug: "module",
  slug: "page-writing",
  definition: "a write handed to the pages, and the commit it lands as",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A writer is stated as the name and address git takes as an author.",
    },
    {
      invariantKind: "departure",
      statement: "A path standing outside `akasha` is refused before anything is written.",
    },
    {
      invariantKind: "departure",
      statement: "What a write puts and what the write takes away are stated apart.",
    },
    {
      invariantKind: "departure",
      statement: "A batch is authored by the writer whose write arrived first.",
    },
    {
      invariantKind: "departure",
      statement: "Every writer a batch carries is named in the message.",
    },
    {
      invariantKind: "departure",
      statement: "Two writes in one batch reaching one path leave the later one standing.",
    },
    {
      invariantKind: "departure",
      statement: "A batch refused is refused whole.",
    },
    {
      invariantKind: "departure",
      statement: "A write may state the commit its bodies were read against.",
    },
    {
      invariantKind: "departure",
      statement: "The commit a write states is taken by any name git resolves to a commit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A write stating one is refused where a path it carries no longer holds the body that commit held.",
    },
    {
      invariantKind: "departure",
      statement: "A write stating a commit lands in a batch of its own.",
    },
    {
      invariantKind: "absence",
      statement: "A write stating no commit is taken as read against what stands.",
    },
    {
      invariantKind: "departure",
      statement: "A page a write creates carries the values its page type generates.",
    },
    {
      invariantKind: "departure",
      statement: "A body is formatted before the body lands.",
    },
    {
      invariantKind: "departure",
      statement: "A value a page keeps outside the commit is written beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A value kept outside the commit is merged onto what its page already keeps.",
    },
    {
      invariantKind: "departure",
      statement: "Two writes in one batch keeping one page merge onto one another in order.",
    },
    {
      invariantKind: "departure",
      statement: "A value kept outside the commit is written after the commit its write landed.",
    },
    {
      invariantKind: "departure",
      statement: "A write refused commits nothing and keeps nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A write carrying only values kept outside the commit lands no commit.",
    },
    {
      invariantKind: "departure",
      statement: "The page a value is kept for is judged for its path as a body would be.",
    },
  ],
} as const satisfies Module
