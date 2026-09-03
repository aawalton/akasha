import type { Module } from "@akasha/code-system/module"

export const checksumSubstitutionReachability = {
  id: "01a06890-2000-7000-9000-000000000005",
  pageTypeSlug: "module",
  slug: "checksum-substitution-reachability",
  definition: "whether a run reaches the step that substitutes a checksum it stamped",
  code: "ts",
} as const satisfies Module
