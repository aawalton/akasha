import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const roleplayed = {
  id: "01a14ad9-e67e-7a0a-9ff9-ee3e304d82ff",
  type: "page-type/boolean-property",
  slug: "roleplayed",
  propertySlug: "roleplayed",
  definition: "whether a roleplay seat narrates a played story or one turn of it",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story or turn stating nothing here is not roleplayed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every turn the action bar makes in a roleplayed story is roleplayed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roleplayed story's coordinator is its roleplay seat.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-17T17:12:36.732Z",
  updatedAt: "2026-10-17T17:58:43.890Z",
} as const satisfies BooleanProperty
