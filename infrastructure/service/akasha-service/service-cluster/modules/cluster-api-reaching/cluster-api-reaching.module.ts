import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const clusterApiReaching = {
  id: "01a06583-0030-7000-94b8-9fa8780482f5",
  type: "page-type/module",
  slug: "cluster-api-reaching",
  definition: "a service behind the Kubernetes API proxy, reached with a service account token",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every value a reach needs is read from the environment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An environment missing a value a reach needs is a caller's mistake.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value set empty is read as a value not set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A missing token or API base is refused as an input error naming that variable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A missing certificate authority leaves the reach trusting what the runtime trusts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The API base is held without a trailing slash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The environment is read once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The values the environment gave are held for the life of the process.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reach still open after thirty seconds is abandoned.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the answer a reach gave.",
    },
  ],
} as const satisfies Module
