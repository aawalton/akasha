import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const storyReviewerInstructions = {
  id: "01a0deb0-2f41-7307-af9c-97908d4ce246",
  type: "page-type/file-property",
  slug: "story-reviewer-instructions",
  propertySlug: "instructions",
  definition: "what a story reviewer's agent does with a turn's beats",
  extensions: ["md"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The instructions are handed whole to the agent that runs the review.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
