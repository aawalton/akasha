import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fileWriteMany = {
  id: "01a09b4d-f89b-72e9-89d7-6913bc242d45",
  type: "page-type/module",
  slug: "file-write-many",
  definition: "many file-backed pages upserted together",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page a batch names lands in one commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A batch whose items each name their page by one key is one question narrowed by that key's values.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A batch narrowed any other way asks after each item on its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page a batch names and the store has not got is made in that same write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The keys an item clears reach the page only where the store has that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page a batch names is read back in one question.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row comes back for each item, in the order the items came.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item matching several pages refuses the whole batch before anything is written.",
    },
  ],
} as const satisfies Module
