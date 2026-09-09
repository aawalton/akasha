import type { Module } from "@akasha/code/module"

export const inferenceNaming = {
  id: "01a0685d-4b35-7001-b274-eaa316779db7",
  pageTypeSlug: "module",
  type: "module",
  slug: "inference-naming",
  definition: "the launchd label, conda environment and directory a service is known by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A name is made into a label and an environment and a path here rather than at each caller.",
    },
  ],
} as const satisfies Module
