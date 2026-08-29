import type { Module } from "../../../code-system/module/module.page-type.ts"

export const pageExportName = {
  id: "01a04e46-47d8-700f-b8cf-ef51ad3fe582",
  pageTypeSlug: "module",
  slug: "page-export-name",
  definition: "the name a page's exported object answers to",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A slug becomes a name by dropping each `-` and raising the character following it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The name a page is written under and the name it is read back by are one answer, so a minted page answers to the name its runner looks for.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here loads a module or reads the disk. A slug has a name whether or not a page of that slug stands.",
    },
  ],
} as const satisfies Module
