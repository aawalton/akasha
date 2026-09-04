import type { Module } from "@akasha/code-system/module"

export const inferenceNaming = {
  id: "01a0685d-4b35-7001-b274-eaa316779db7",
  pageTypeSlug: "module",
  slug: "inference-naming",
  definition: "the launchd label, conda environment and directory a service is known by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A name is turned into a label, an environment and a path here rather than spelled out at each caller.",
    },
  ],
} as const satisfies Module
