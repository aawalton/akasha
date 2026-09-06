import type { Module } from "@akasha/code-system/module"

export const talosWaitForPort = {
  id: "01a06813-7b0f-7521-9492-72769e9aaf3c",
  pageTypeSlug: "module",
  slug: "talos-wait-for-port",
  definition: "a poll loop resolving once a host and a port accept a TCP connection",
  code: "ts",
} as const satisfies Module
