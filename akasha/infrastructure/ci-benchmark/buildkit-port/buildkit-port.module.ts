import type { Module } from "@akasha/code-system/module"

export const buildkitPort = {
  id: "01a068dd-71dc-7961-b0d1-6bf2c0f87bd9",
  pageTypeSlug: "module",
  slug: "buildkit-port",
  definition: "the port a local buildkit daemon answers on",
  code: "ts",
} as const satisfies Module
