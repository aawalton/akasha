import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorGatewayAdoptionDecide = {
  id: "01a06838-5a84-7004-bfa3-4f11134ef503",
  type: "page-type/module",
  slug: "supervisor-gateway-adoption-decide",
  definition: "whether a supervisor starts a new model gateway",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "No live proxy is answered with a fresh proxy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A live proxy at the version expected here is taken over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A live proxy at another version is taken over anyway while that proxy is healthy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A live proxy at another version that is unhealthy is replaced rather than taken over.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here starts or stops or reaches a proxy.",
    },
  ],
} as const satisfies Module
