import type { Module } from "@akasha/code-system/module"

export const ciContainerName = {
  id: "01a06861-24c9-7001-9c56-9939459ba3d1",
  pageTypeSlug: "module",
  slug: "ci-container-name",
  definition: "the name a step's container carries on the cluster",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A container name carries the pipeline sequence, the step name and the short commit.",
    },
    {
      invariantKind: "departure",
      statement: "A container name is at most 63 characters.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name too long for that keeps a digest of the whole, so two long names stay distinct.",
    },
  ],
} as const satisfies Module
