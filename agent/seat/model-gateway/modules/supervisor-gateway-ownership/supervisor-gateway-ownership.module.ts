import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorGatewayOwnership = {
  id: "01a06876-abda-7000-a634-514a119db494",
  type: "page-type/module",
  slug: "supervisor-gateway-ownership",
  definition: "whether this supervisor stops the model gateway it owns, and the stop itself",
  code: "ts",
} as const satisfies Module
