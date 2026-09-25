import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorGatewayOwnership = {
  id: "01a06876-abda-7000-a634-514a119db494",
  type: "page-type/module",
  slug: "supervisor-gateway-ownership",
  definition: "whether the model gateway is stopped by this supervisor",
  code: "ts",
} as const satisfies Module
