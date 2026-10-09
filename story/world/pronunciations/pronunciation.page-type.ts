import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const pronunciation = {
  id: "01a11c0e-f7a2-73f9-b751-0c33aec73a37",
  type: "page-type/page-type",
  slug: "pronunciation",
  definition: "a word as narration says it",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "pronunciation" },
    { partOfSpeech: "part-of-speech/noun", spelling: "pronunciations" },
  ],
  pluralSlug: "pronunciations",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/world", required: false, many: false },
    { pageProperty: "text-property/spoken-as", required: false, many: false },
    { pageProperty: "text-property/phonemes", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A pronunciation's title is the word as the story writes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pronunciation naming a world is said that way only in that world's stories.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pronunciation naming no world is said that way in every story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where a world's pronunciation and one naming no world reach one word, the world's is said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pronunciation naming no world sits under the pronunciation page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pronunciation states a respelling, the phonemes, or both.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pronunciation that states its phonemes is spoken as those phonemes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Narration passes over a pronunciation stating neither, since no property requires one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pronunciation reaches the word whole, never part of a word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title holding a capital reaches the word only in that case or in capitals.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A title in small letters reaches the word in small letters, capitalised or in capitals.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-08T15:08:25.377Z",
  updatedAt: "2026-10-09T01:58:33.217Z",
  parts: ["text-property/spoken-as", "text-property/phonemes"],
} as const satisfies PageType
