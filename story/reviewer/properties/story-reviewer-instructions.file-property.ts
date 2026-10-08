import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const storyReviewerInstructions = {
  id: "01a0deb0-2f41-7307-af9c-97908d4ce246",
  type: "page-type/file-property",
  slug: "story-reviewer-instructions",
  propertySlug: "instructions",
  definition: "what a story reviewer's agent does with the beats and prose of a turn or chapter",
  extensions: ["md"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The instructions are handed whole to the agent that runs the review.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-26T17:08:03.521Z",
  updatedAt: "2026-09-28T19:22:08.000Z",
} as const satisfies FileProperty
