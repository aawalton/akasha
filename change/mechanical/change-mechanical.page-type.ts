import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const changeMechanical = {
  id: "01a078e8-e0c0-7001-9d36-808d02d6c285",
  type: "page-type/page-type",
  slug: "change-mechanical",
  definition: "a change another change composes rather than a command line reaches",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "mechanical change" },
    { partOfSpeech: "part-of-speech/noun", spelling: "mechanical changes" },
  ],
  extends: ["page-type/change"],
  parts: [
    "domain/change-mechanical-page-property",
    "domain/change-mechanical-prose",
    "page-type/change-mechanical-file",
    "page-type/change-mechanical-file-content",
    "page-type/change-mechanical-folder",
    "page-type/change-mechanical-page-type",
  ],
  properties: [],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A mechanical change is reached by another change rather than by a command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mechanical change runs no check of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mechanical change is filed under the sub-type naming the thing acted on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A mechanical change acting on a page property answers for every page carrying that property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A mechanical change acting on a page type answers for every page filed under that page type.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
