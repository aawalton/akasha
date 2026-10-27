import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const skillExperience = {
  id: "01a17ebd-0fe2-790b-8a05-079205691525",
  type: "page-type/number-property",
  slug: "skill-experience",
  propertySlug: "experience",
  definition: "the experience a held skill has toward its next level",
  nullable: false,
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Experience sits on a held skill rather than on the world's skill.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How much experience a next level takes is the story's own mechanic's business.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A held skill starts at no experience rather than at a figure worked out later.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-27T19:01:22.017Z",
  updatedAt: "2026-10-27T19:02:55.979Z",
} as const satisfies NumberProperty
