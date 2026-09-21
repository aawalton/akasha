import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const bytesSlug = {
  id: "01a0c644-9183-7ef5-8cbc-e26187cf8bf9",
  type: "page-type/module",
  slug: "bytes-slug",
  definition: "a slug naming a page after the bytes that page holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug is what it opens with and the first sixteen hex of the sha256.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Sixteen hex is one rule here rather than one rule for each kind of page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the slug opens with is the caller's to name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The same bytes give the same slug, so a page of those bytes lands once.",
    },
  ],
} as const satisfies Module
