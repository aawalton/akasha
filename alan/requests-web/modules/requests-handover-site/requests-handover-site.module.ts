import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const requestsHandoverSite = {
  id: "01a0c537-ba9b-797c-9ce3-0dd6a8f02f52",
  type: "page-type/module",
  slug: "requests-handover-site",
  definition: "how the Requests site takes part in a handover",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The Requests site is named `requests` in a handover, and alanwalton.com knows that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The Requests site signs its own cookie with `REQUESTS_SESSION_KEY`.",
    },
  ],
  createdAt: "2026-09-21T18:25:58.939Z",
  updatedAt: "2026-10-30T16:03:02.771Z",
} as const satisfies Module
