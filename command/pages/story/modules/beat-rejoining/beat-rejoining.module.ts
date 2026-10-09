import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const beatRejoining = {
  id: "01a11e2e-ddaa-739b-8dff-3466106f1697",
  type: "page-type/module",
  slug: "beat-rejoining",
  definition: "the prose a chapter's beats file holds, joined end to end",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each beat's prose is taken as written, with nothing trimmed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat stating no prose adds nothing to what is joined.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk.",
    },
  ],
  createdAt: "2026-10-09T01:02:30.313Z",
  updatedAt: "2026-10-09T01:02:30.313Z",
} as const satisfies Module
