import type { Module } from "@akasha/code-system/module"
import type { PageType } from "@akasha/pages-system/page-type"

export type WorkflowStep = Module

export const workflowStep = {
  id: "01a07233-714d-712e-974d-02c5b7144850",
  pageTypeSlug: "page-type",
  slug: "workflow-step",
  definition: "a step a workflow runs in a container",
  pluralSlug: "workflow-steps",
  extendsSlug: ["page-type/module"],
  allowsTmpPaths: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A step runs in a container image rather than on this workstation.",
    },
    {
      invariantKind: "absence",
      statement: "This page type adds no property of its own.",
    },
  ],
} as const satisfies PageType
