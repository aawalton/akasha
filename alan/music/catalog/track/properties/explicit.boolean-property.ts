import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const explicit = {
  id: "01a0a5e0-58f3-740e-9244-3bdebb7ceedb",
  type: "page-type/boolean-property",
  slug: "explicit",
  propertySlug: "explicit",
  definition: "whether a provider marks a recording as explicit",
  spellings: [{ partOfSpeech: "part-of-speech/adjective", spelling: "explicit" }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This is what the provider says rather than what a listener judges.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-15T16:22:18.611Z",
  updatedAt: "2026-10-30T17:22:40.718Z",
} as const satisfies BooleanProperty
