import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const handoverReader = {
  id: "01a0bcc7-ddd5-7853-9c7d-c024406e8843",
  type: "page-type/module",
  slug: "handover-reader",
  definition: "the reader a route reads off the session cookie, or nobody",
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
} as const satisfies Module
