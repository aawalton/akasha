import type { Module } from "@akasha/code-system/module"

export const kubepodsOomConstants = {
  id: "01a06810-1262-7537-a01a-c7a74da24d2a",
  pageTypeSlug: "module",
  slug: "kubepods-oom-constants",
  definition: "the metric names, paths and alerts an out-of-memory kill is counted by",
  code: "ts",
} as const satisfies Module
