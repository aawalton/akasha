import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const doctrine = {
  id: "01a0826f-8d12-7268-918c-0b3a3574d5f6",
  type: "page-type/page-type",
  slug: "doctrine",
  definition: "a game master's rulings for every game",
  spellings: [{ partOfSpeech: "part-of-speech/noun", spelling: "doctrine" }],
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: [
    "file-property/gate-dimensions",
    "file-property/policies",
    "file-property/sheet-template",
    "file-property/tally-catalog",
    "number-property/doctrine-version",
  ],
  properties: [
    { pageProperty: "number-property/doctrine-version", required: true, many: false },
    { pageProperty: "file-property/policies", required: false, many: false },
    { pageProperty: "file-property/gate-dimensions", required: false, many: false },
    { pageProperty: "file-property/sheet-template", required: false, many: false },
    { pageProperty: "file-property/tally-catalog", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The plural of doctrine is doctrine.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One doctrine is here at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A doctrine has the revision that doctrine is on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each part of a doctrine is a file beside the doctrine.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader loads only the part the reader asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words a doctrine has are the game master's rather than akasha's own.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
