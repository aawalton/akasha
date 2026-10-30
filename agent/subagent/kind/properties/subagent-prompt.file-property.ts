import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const subagentPrompt = {
  id: "01a06838-7a9e-7b95-ab3e-f0ad9a5d9095",
  type: "page-type/file-property",
  slug: "subagent-prompt",
  propertySlug: "subagent-prompt",
  definition: "the text every subagent of a kind starts with",
  extensions: ["md"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A prompt sits in its own file rather than in a value beside the page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A prompt says nothing about the work one subagent is given.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:02:07.006Z",
  updatedAt: "2026-10-30T14:37:00.297Z",
} as const satisfies FileProperty
