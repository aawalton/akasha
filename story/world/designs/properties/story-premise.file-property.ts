import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const storyPremise = {
  id: "01a06577-f385-7179-9713-a0ebc7944548",
  type: "page-type/file-property",
  slug: "story-premise",
  propertySlug: "premise",
  definition: "what a story is about, in the shape of its telling",
  extensions: ["md"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A premise is a document beside its design rather than a line in the design.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A premise is written in the shape the story that premise opens is told in.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T04:12:35.077Z",
  updatedAt: "2026-09-22T13:46:35.000Z",
} as const satisfies FileProperty
