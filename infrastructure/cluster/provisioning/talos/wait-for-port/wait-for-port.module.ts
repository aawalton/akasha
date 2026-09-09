import type { Module } from "@akasha/code/module"

export const waitForPort = {
  id: "01a06813-7b0f-7521-9492-72769e9aaf3c",
  pageTypeSlug: "module",
  type: "module",
  slug: "wait-for-port",
  definition: "a poll loop resolving once a host and a port accept a TCP connection",
  code: "ts",
} as const satisfies Module
