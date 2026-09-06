import type { Module } from "../../code-system/modules/module.page-type.ts"

export const changeAnswer = {
  id: "01a07721-531c-732a-a072-2842893f0584",
  pageTypeSlug: "module",
  slug: "change-answer",
  definition: "the edits a change answers rather than writes",
  code: "ts",
  types: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An edit stating no body takes its path away.",
    },
    {
      invariantKind: "departure",
      statement: "A move is the path one edit leaves and the path a second edit lands at.",
    },
    {
      invariantKind: "departure",
      statement: "A later edit to a path replaces an earlier edit to that path.",
    },
    {
      invariantKind: "departure",
      statement: "One refusal refuses the whole answer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or writes to the disk.",
    },
  ],
} as const satisfies Module
