import type { Module } from "@akasha/code/module"

export const orphanSource = {
  id: "01a08172-edfe-79d0-8006-19208c089c54",
  pageTypeSlug: "module",
  slug: "orphan-source",
  definition: "the source files under a workspace's top folder that no workspace owns",
  code: "ts",
} as const satisfies Module
