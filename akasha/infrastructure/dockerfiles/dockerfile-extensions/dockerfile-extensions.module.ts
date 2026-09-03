import type { Module } from "@akasha/code-system/module"

export const dockerfileExtensions = {
  id: "01a06865-abff-7002-982c-70fcb1c90980",
  pageTypeSlug: "module",
  slug: "dockerfile-extensions",
  definition: "the per-service overrides a deploy folder states for its generated Dockerfile",
  code: "ts",
} as const satisfies Module
