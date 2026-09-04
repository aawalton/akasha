import type { Module } from "@akasha/code-system/module"

export const cgroupPsiCollector = {
  id: "01a06810-1262-7c82-b87d-67a1c7d6dd5e",
  pageTypeSlug: "module",
  slug: "cgroup-psi-collector",
  definition: "the sidecar that reads each control group's pressure off the node",
  code: "ts",
} as const satisfies Module
