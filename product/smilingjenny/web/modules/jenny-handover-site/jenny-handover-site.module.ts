import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const jennyHandoverSite = {
  id: "01a0c1e4-5f22-7a90-b8d1-3c7e9a4b2f08",
  type: "page-type/module",
  slug: "jenny-handover-site",
  definition: "what Jenny's site is called in a handover, where it answers, and its signing key",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Jenny's site is named `smilingjenny`, and alanwalton.com knows that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Jenny's site signs its own cookie with `SMILINGJENNY_SESSION_KEY`.",
    },
  ],
} as const satisfies Module
