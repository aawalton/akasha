import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const kindNaming = {
  id: "01a0b7b1-69cc-7aad-8e0a-f9614f110824",
  type: "page-type/module",
  slug: "kind-naming",
  definition: "how a folder's name is read as naming the page types one plural covers",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The page types a plural gathers pages of are handed in rather than worked out here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page type that plural covers is one of those page types or a page type extending one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name names a page type covered whose own plural is that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name names a page type covered whose slug is that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name names a page type covered whose slug ends with `-` and that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page type a name names is answered rather than the first one found.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the folder the name was taken from.",
    },
  ],
} as const satisfies Module
