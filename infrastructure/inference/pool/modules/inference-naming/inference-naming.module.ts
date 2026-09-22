import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inferenceNaming = {
  id: "01a0685d-4b35-7001-b274-eaa316779db7",
  type: "page-type/module",
  slug: "inference-naming",
  definition: "a service's launchd label, conda environment and directory",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name is made into a label and an environment and a path here rather than at each caller.",
    },
  ],
} as const satisfies Module
