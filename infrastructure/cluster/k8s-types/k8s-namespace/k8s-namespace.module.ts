import type { Module } from "@akasha/code/module"

export const k8sNamespace = {
  id: "01a07c68-0024-7e4f-88e0-70ee0ed9679b",
  pageTypeSlug: "module",
  type: "module",
  slug: "k8s-namespace",
  definition: "a Kubernetes namespace rendered to YAML",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A namespace is rendered from the name and the labels handed in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a namespace of its own.",
    },
  ],
} as const satisfies Module
