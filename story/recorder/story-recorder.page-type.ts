import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyRecorder = {
  id: "01a0e054-324d-793a-8ecd-433ed00e9de5",
  type: "page-type/page-type",
  slug: "story-recorder",
  definition:
    "one thing the recorders of a turn or chapter write into pages once its prose is written",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "story recorder" },
    { partOfSpeech: "part-of-speech/noun", spelling: "story recorders" },
  ],
  pluralSlug: "story-recorders",
  extends: ["page-type/page"],
  parts: [
    "text-property/story-recorder-name",
    "file-property/story-recorder-instructions",
    "relation-property/story-recorder-step",
  ],
  properties: [
    { pageProperty: "text-property/story-recorder-name", required: true, many: false },
    { pageProperty: "relation-property/story-recorder-step", required: false, many: false },
    {
      pageProperty: "file-property/story-recorder-instructions",
      required: true,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story recorder under this folder runs on every turn of every game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story recorder runs at the step it names, after the prose where it names none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One fresh agent runs each story recorder on a turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story recorder lands nothing itself, and drafts its edits instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The advance moving a turn to its player lands every recorder's edits and that move in one commit.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
