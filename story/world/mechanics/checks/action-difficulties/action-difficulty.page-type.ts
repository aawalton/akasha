import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const actionDifficulty = {
  id: "01a17eed-1904-7693-9800-12acdbba4c77",
  type: "page-type/page-type",
  slug: "action-difficulty",
  definition: "how hard one action is, set by the game master",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "action difficulty" },
    { partOfSpeech: "part-of-speech/noun", spelling: "action difficulties" },
  ],
  pluralSlug: "action-difficulties",
  extends: ["page-type/page"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "number-property/odds-modifier", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An action's difficulty is the task's alone, never who tries it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action difficulty stating no odds modifier is not rolled, and fails.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The action difficulties are listed by their odds modifier, highest first.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-27T19:53:50.083Z",
  updatedAt: "2026-10-27T19:53:50.083Z",
} as const satisfies PageType
