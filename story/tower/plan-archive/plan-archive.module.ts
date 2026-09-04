import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const planArchive = {
  id: "01a05bc6-fa4a-700d-8443-1f8961881e20",
  pageTypeSlug: "module",
  slug: "plan-archive",
  definition: "which closed chapters are ready to leave the log, each with the beats it holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The most recent closed chapters are held back by a window the caller sets.",
    },
    {
      invariantKind: "departure",
      statement: "A closed chapter missing either end stops the whole plan.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter whose end precedes its start stops the whole plan.",
    },
  ],
} as const satisfies Module
