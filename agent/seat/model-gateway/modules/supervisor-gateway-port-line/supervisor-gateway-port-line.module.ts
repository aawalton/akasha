import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorGatewayPortLine = {
  id: "01a06876-abda-7001-bdd6-58a4e9373879",
  type: "page-type/module",
  slug: "supervisor-gateway-port-line",
  definition: "the port the oauth proxy prints on its first line of output",
  code: "ts",
} as const satisfies Module
