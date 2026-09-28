import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const draftLength = {
  id: "01a0e942-1946-725e-ac18-354c2dbc492c",
  type: "page-type/module",
  slug: "draft-length",
  definition: "whether the bodies a draft leaves stay under the byte ceiling each is held to",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A draft leaving a body over its byte ceiling is refused, and nothing is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ceiling and the files let off it are the ones the landing's check reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only the bodies the new edits touch are measured, as every edit kept leaves them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A drafting run asks here for every fault of its bodies, a parse fault among them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A draft kept beside a turn is measured when drafted, since another agent lands it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drafting run asks here whether its caller may define the mechanics it adds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drafting run asks here whether each page it changes still matches its type.",
    },
  ],
} as const satisfies Module
