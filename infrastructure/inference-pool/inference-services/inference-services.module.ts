import type { Module } from "@akasha/code-system/module"

export const inferenceServices = {
  id: "01a0685d-4b35-7004-84e3-d0c0ff89734f",
  pageTypeSlug: "module",
  slug: "inference-services",
  definition: "every inference service declared for the machines outside the cluster",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A service names the directory it is provisioned from as a path inside this repository.",
    },
    {
      invariantKind: "departure",
      statement: "A service absent from this declaration is torn down rather than left standing.",
    },
  ],
} as const satisfies Module
