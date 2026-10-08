import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const waitForPort = {
  id: "01a06813-7b0f-7521-9492-72769e9aaf3c",
  type: "page-type/module",
  slug: "wait-for-port",
  definition: "a poll loop resolving once a host and a port accept a TCP connection",
  code: "ts",
  createdAt: "2026-09-03T16:21:42.287Z",
  updatedAt: "2026-09-15T18:34:44.000Z",
} as const satisfies Module
