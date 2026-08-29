import type { Module } from "../../../code-system/module/module.page-type.ts"

export const nameMatching = {
  id: "01a04eba-7459-7284-8c06-c79e5963387d",
  pageTypeSlug: "module",
  slug: "name-matching",
  definition: "the one rule by which a name format answers whether a name is written in it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every format answers through this one rule, so the formats differ by the shape they hand it and by nothing else.",
    },
    {
      invariantKind: "departure",
      statement:
        "A format's whole judgement is the shape on the format's own page, so no format is a second spelling of another.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A shape is asked with `test` alone and so carries no `g` flag, which would carry a place between calls.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here knows a format's slug or reads a page. A shape is handed in and answers for itself.",
    },
  ],
} as const satisfies Module
