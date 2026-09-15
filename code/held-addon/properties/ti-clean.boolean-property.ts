import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const tiClean = {
  id: "01a0819e-2a48-7266-ba95-cc9be07ddbd5",
  type: "page-type/boolean-property",
  slug: "ti-clean",
  propertySlug: "ti-clean",
  definition: "whether an addon's TypeScript source has no raw table call",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A ti-clean addon has no `table.insert` and no `table.remove` call site in its TypeScript.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The `ti-clean-source-zero` ratchet keeps a ti-clean addon clean.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon saying nothing here is backlog rather than a violation.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
