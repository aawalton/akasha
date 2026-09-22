import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const subagentPrompt = {
  id: "01a06838-7a9e-7b95-ab3e-f0ad9a5d9095",
  type: "page-type/file-property",
  slug: "subagent-prompt",
  propertySlug: "subagent-prompt",
  definition: "what a subagent of a kind is told before its work is handed to it",
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
} as const satisfies FileProperty
