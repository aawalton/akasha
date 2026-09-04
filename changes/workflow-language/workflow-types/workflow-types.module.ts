import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const workflowTypes = {
  id: "01a06f10-7000-7000-b0000-9d4a2f6c0000e1",
  pageTypeSlug: "module",
  slug: "workflow-types",
  definition:
    "the shapes a workflow, a step, a secret reference and a run's context are written in",
  code: "ts",
} as const satisfies Module
