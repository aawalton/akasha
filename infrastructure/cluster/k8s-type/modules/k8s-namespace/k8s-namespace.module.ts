import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const k8sNamespace = {
  id: "01a07c68-0024-7e4f-88e0-70ee0ed9679b",
  type: "page-type/module",
  slug: "k8s-namespace",
  definition: "a Kubernetes namespace rendered to YAML",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A namespace is rendered from the name and the labels handed in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names a namespace of its own.",
    },
  ],
  createdAt: "2026-09-07T15:06:25.700Z",
  updatedAt: "2026-09-15T18:34:44.000Z",
} as const satisfies Module
