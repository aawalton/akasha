import type { Module } from "@akasha/code-system/module"

export const supervisorProxyVersion = {
  id: "01a06876-abda-7002-b6b4-75fdee84946b",
  pageTypeSlug: "module",
  slug: "supervisor-proxy-version",
  definition: "respawning the oauth proxy when the gateway's version stamp changes",
  code: "ts",
} as const satisfies Module
