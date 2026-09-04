import type { Module } from "@akasha/code-system/module"

export const supervisorProxyOwnership = {
  id: "01a06876-abda-7000-a634-514a119db494",
  pageTypeSlug: "module",
  slug: "supervisor-proxy-ownership",
  definition: "whether this supervisor stops the oauth proxy it owns, and the stop itself",
  code: "ts",
} as const satisfies Module
