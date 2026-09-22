import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const commonLanguageTerm = {
  id: "01a07c6e-d2b5-7a30-95da-e46d29cd2e27",
  type: "page-type/page-type",
  slug: "common-language-term",
  definition: "one word or phrase with its ordinary sense",
  extends: ["page-type/allowed-term"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A word akasha writes in its ordinary sense states no definition of its own.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
