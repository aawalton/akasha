import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyReviewer = {
  id: "01a0deb0-2f42-79ab-8969-52d0e5afcb0c",
  type: "page-type/page-type",
  slug: "story-reviewer",
  definition: "a check run over every played turn's beats before the prose is written",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "story reviewer" },
    { partOfSpeech: "part-of-speech/noun", spelling: "story reviewers" },
  ],
  pluralSlug: "story-reviewers",
  extends: ["page-type/page"],
  parts: ["text-property/story-reviewer-name", "file-property/story-reviewer-instructions"],
  properties: [
    { pageProperty: "text-property/story-reviewer-name", required: true, many: false },
    {
      pageProperty: "file-property/story-reviewer-instructions",
      required: true,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story reviewer under this folder runs on every turn of every game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One fresh agent runs each story reviewer on a turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story reviewer records what it finds as the turn's issues.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
