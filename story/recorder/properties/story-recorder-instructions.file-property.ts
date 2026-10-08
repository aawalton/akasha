import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const storyRecorderInstructions = {
  id: "01a0e054-324c-7c5f-8cf2-aad1564badaa",
  type: "page-type/file-property",
  slug: "story-recorder-instructions",
  propertySlug: "instructions",
  definition: "what a story recorder's agent does with the prose of a turn or chapter",
  extensions: ["md"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The instructions are handed whole to the agent that runs the recorder.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-27T00:46:49.420Z",
  updatedAt: "2026-09-28T19:22:08.000Z",
} as const satisfies FileProperty
