import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const handoverReader = {
  id: "01a0bcc7-ddd5-7853-9c7d-c024406e8843",
  type: "page-type/module",
  slug: "handover-reader",
  definition: "how code finds the contributor behind a request to a website",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader read here is the contributor the session cookie names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader carries that contributor and nothing else.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No header is written back, so reading the cookie changes no session.",
    },
  ],
  createdAt: "2026-09-20T03:06:50.197Z",
  updatedAt: "2026-10-30T15:47:39.749Z",
} as const satisfies Module
