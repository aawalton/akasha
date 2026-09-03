import type { Module } from "@akasha/code-system/module"

export const stepDefinition = {
  id: "01a06913-656f-7480-8ec4-e014cac3f229",
  pageTypeSlug: "module",
  slug: "step-definition",
  definition: "a step's definition read whole out of the uncommitted sidecar beside its page",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A step's definition is a nested mapping, and flattening it to text loses it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A step with no sidecar, or a sidecar holding no mapping, has an empty definition.",
    },
    {
      invariantKind: "departure",
      statement: "A list in the definition slot is no mapping and reads as empty.",
    },
  ],
} as const satisfies Module
