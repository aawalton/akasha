import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const commonLanguageTerm = {
  id: "01a07c6e-d2b5-7a30-95da-e46d29cd2e27",
  type: "page-type/page-type",
  slug: "common-language-term",
  definition: "a word or phrase with its ordinary sense",
  extends: ["page-type/allowed-term"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A word akasha writes in its ordinary sense states no definition of its own.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-07T15:13:52.821Z",
  updatedAt: "2026-09-25T15:41:48.000Z",
} as const satisfies PageType
