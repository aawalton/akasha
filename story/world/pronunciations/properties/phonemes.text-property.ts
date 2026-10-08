import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const phonemes = {
  id: "01a11c9d-f7b6-764b-b216-686fbd320834",
  type: "page-type/text-property",
  slug: "phonemes",
  propertySlug: "phonemes",
  definition: "the sounds narration says for a written word, spelled in misaki's phonemes",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The phonemes are misaki's, the set Kokoro reads, rather than plain IPA.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The phonemes are written without the slashes Kokoro's markup puts round them.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-08T17:44:37.042Z",
  updatedAt: "2026-10-08T17:44:37.042Z",
} as const satisfies TextProperty
