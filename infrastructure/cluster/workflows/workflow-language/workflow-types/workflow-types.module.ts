import type { Module } from "../../../../../code-system/modules/module.page-type.ts"

export const workflowTypes = {
  id: "01a07740-d031-7529-a9c2-c53dba849ec5",
  pageTypeSlug: "module",
  slug: "workflow-types",
  definition:
    "the shapes a workflow, a step, a secret reference and a run's context are written in",
  code: "ts",
} as const satisfies Module
