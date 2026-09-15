import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const kubepodsOomConstants = {
  id: "01a06810-1262-7537-a01a-c7a74da24d2a",
  type: "module",
  slug: "kubepods-oom-constants",
  definition: "the metric names and paths an out-of-memory kill is counted by",
  code: "ts",
} as const satisfies Module
