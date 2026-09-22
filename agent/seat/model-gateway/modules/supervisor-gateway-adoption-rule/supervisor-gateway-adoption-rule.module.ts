import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorGatewayAdoptionRule = {
  id: "01a0687b-aa83-7000-85c9-6374fb77804b",
  type: "page-type/module",
  slug: "supervisor-gateway-adoption-rule",
  definition: "asking whether an oauth proxy already there is adopted",
  code: "ts",
} as const satisfies Module
