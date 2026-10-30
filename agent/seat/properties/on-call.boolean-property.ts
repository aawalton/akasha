import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const onCall = {
  id: "01a0539b-d9f2-7d0c-80d9-1eabbdc9ec3e",
  type: "page-type/boolean-property",
  slug: "on-call",
  propertySlug: "on-call",
  definition: "whether an agent waits for work sent to the agent",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "on call" }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page not on call states false.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page cleared of this property is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose role is on call starts on call.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-30T16:58:37.938Z",
  updatedAt: "2026-10-30T15:46:53.072Z",
} as const satisfies BooleanProperty
