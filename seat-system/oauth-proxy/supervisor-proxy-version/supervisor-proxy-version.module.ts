import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const supervisorProxyVersion = {
  id: "01a06876-abda-7002-b6b4-75fdee84946b",
  type: "module",
  slug: "supervisor-proxy-version",
  definition: "respawning the oauth proxy when the gateway's version stamp changes",
  code: "ts",
} as const satisfies Module
