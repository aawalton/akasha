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
      statement: "What a write puts and what it takes away are stated apart.",
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
      statement:
        "A write stating one is refused where a path it carries no longer holds the body that commit held.",
    },
    {
      invariantKind: "departure",
      statement: "A write stating one lands in a batch of its own.",
    },
    {
      invariantKind: "absence",
      statement: "A write stating none is taken as read against what stands.",
    },
  ],
} as const satisfies Module
