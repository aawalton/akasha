import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const proxyReading = {
  id: "01a0c431-b8d3-7e65-a891-4058c98aea65",
  type: "page-type/module",
  slug: "proxy-reading",
  definition: "the caller a host's handover cookie names behind a request",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every host the route map names is a peripheral of alanwalton.com.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A peripheral is named by the first label of the host it answers on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every host behind the proxy signs its cookies with one key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor the environment does not name reaches nothing behind the proxy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A caller signed in as somebody not named is refused rather than sent round to sign in again.",
    },
  ],
} as const satisfies Module
