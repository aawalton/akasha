import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const requestsHandoverSite = {
  id: "01a0c537-ba9b-797c-9ce3-0dd6a8f02f52",
  type: "page-type/module",
  slug: "requests-handover-site",
  definition:
    "what the Requests site is called in a handover, where it answers, and its signing key",
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
} as const satisfies Module
