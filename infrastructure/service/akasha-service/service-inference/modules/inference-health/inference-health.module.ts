import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inferenceHealth = {
  id: "01a0d973-be39-7b8a-926e-0ad22c1af875",
  type: "page-type/module",
  slug: "inference-health",
  definition: "whether each inference service answers on the machine it runs on",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every inference service that is to be running is watched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service that is not to be running is watched by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each host is reached once over ssh, and asked everything in that one script.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service is asked on the host itself, at its own port, so no request passes the cop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service giving any HTTP answer at all is answering.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An always-on service is well where it answers on its port.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pool service is broken where the traffic cop on its host does not answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pool service the cop holds resident is well where it answers on its internal port.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pool service the cop has swapped out is well while the cop answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host that cannot be reached leaves every service on it broken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page that states no inference service whole is broken with what it lacks.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here makes a service resident or swaps one out.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a verdict.",
    },
  ],
} as const satisfies Module
