import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchProvenance = {
  id: "01a0685f-4ed9-7719-bfc4-bcec345f8656",
  type: "page-type/module",
  slug: "monarch-provenance",
  definition: "how code describes how the Monarch category of a Monarch transaction was decided",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A decision records both the kind of thing that decided and the one thing that decided.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A decision naming nothing that decided is refused rather than written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A source is programmatic or manual and is nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category Monarch carried is not decided here, whoever set it in Monarch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is trimmed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Blank space names nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This module composes the record a writer writes.",
    },
  ],
  createdAt: "2026-09-03T17:44:31.705Z",
  updatedAt: "2026-10-30T15:42:59.023Z",
} as const satisfies Module
