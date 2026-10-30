import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const handoverLeaving = {
  id: "01a0bcaf-ba47-7863-8afd-eaa22157f632",
  type: "page-type/module",
  slug: "handover-leaving",
  definition: "how a contributor ends a handover at a website",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Leaving takes away the peripheral's own cookie and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader who has left lands on the site's sign-in path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reader leaves by posting, and a leaving asked for by other means sends them home.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing at alanwalton.com is told a reader left a peripheral.",
    },
  ],
  createdAt: "2026-09-20T02:40:28.231Z",
  updatedAt: "2026-10-30T15:46:59.152Z",
} as const satisfies Module
