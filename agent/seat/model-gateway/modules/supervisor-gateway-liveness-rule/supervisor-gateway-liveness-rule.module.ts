import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorGatewayLivenessRule = {
  id: "01a0687b-aa85-7000-bfa7-d7df4d303aa0",
  type: "page-type/module",
  slug: "supervisor-gateway-liveness-rule",
  definition: "asking what to do about an oauth proxy that stopped answering",
  code: "ts",
} as const satisfies Module
