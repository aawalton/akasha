import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const changeGenerator = {
  id: "01a0d4dc-6d15-741e-962d-154d0705de60",
  type: "page-type/page-type",
  slug: "change-generator",
  definition: "code adding the edits a change owes before that change lands",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "change generator" },
    { partOfSpeech: "part-of-speech/noun", spelling: "change generators" },
  ],
  pluralSlug: "change-generators",
  extends: ["page-type/module"],
  parts: ["module/change-generating", "multi-relation-property/runs-after"],
  properties: [
    {
      pageProperty: "multi-relation-property/runs-after",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A change generator's code is handed the change and answers the edits it adds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change generator sees the edits of every change generator it runs after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change generator may answer whether the change could turn it at all.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  loadedExport: ["generateChange", "couldTurn"],
} as const satisfies PageType
