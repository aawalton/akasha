import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const roleplayed = {
  id: "01a14ad9-e67e-7a0a-9ff9-ee3e304d82ff",
  type: "page-type/boolean-property",
  slug: "roleplayed",
  propertySlug: "roleplayed",
  definition: "whether a played turn was played in a roleplay conversation before it was made",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn stating nothing here was not roleplayed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A roleplayed turn waits on the roleplay-recorder where it would wait on the world builder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "It waits on the roleplay-recorder where it would wait on the game master or writer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roleplayed turn tells only the story's roleplay-recorder of each move.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roleplayed turn reaching player tells Alan nothing, since he read it already.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-17T17:12:36.732Z",
  updatedAt: "2026-10-17T17:12:36.732Z",
} as const satisfies BooleanProperty
