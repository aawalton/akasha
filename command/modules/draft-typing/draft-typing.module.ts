import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const draftTyping = {
  id: "01a0e9bb-da84-78ea-b5fa-9b712b7a6a50",
  type: "page-type/module",
  slug: "draft-typing",
  definition: "whether the pages a draft changes still match what their page types shape",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A draft leaving a page its type refuses is refused when drafted, and nothing is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page type's judgement is the one the landing's check makes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A judgement that throws leaves the draft to the landing's check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fault the committed page already has is not blamed on the draft.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page the draft adds is judged when drafted, excusing the values its landing generates.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mechanical landing runs no check, so a page it adds is judged here or nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page the draft moves is not judged as a page the draft adds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A draft kept beside a turn is judged when drafted, since another agent lands it and cannot mend it.",
    },
  ],
  createdAt: "2026-09-28T20:36:37.636Z",
  updatedAt: "2026-10-30T14:03:50.980Z",
} as const satisfies Module
