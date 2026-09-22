import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const resolutionMechanism = {
  id: "01a0673c-8e0e-7013-ae6f-047f588f0390",
  type: "page-type/file-property",
  slug: "resolution-mechanism",
  propertySlug: "resolution-mechanism",
  definition: "the machinery settling a game's actions",
  extensions: ["json"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A game naming mechanics settles a turn by running one, and says here how it is run.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "One game naming no mechanic takes its numbers from rules outside this repository.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
