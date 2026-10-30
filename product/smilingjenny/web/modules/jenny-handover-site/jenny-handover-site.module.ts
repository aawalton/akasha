import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const jennyHandoverSite = {
  id: "01a0c1e4-5f22-7a90-b8d1-3c7e9a4b2f08",
  type: "page-type/module",
  slug: "jenny-handover-site",
  definition: "how smilingjenny.me takes part in a handover",
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
  createdAt: "2026-09-21T02:56:04.386Z",
  updatedAt: "2026-10-30T16:03:58.093Z",
} as const satisfies Module
