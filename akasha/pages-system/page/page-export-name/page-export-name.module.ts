import type { Module } from "@akasha/code-system/module"

export const pageExportName = {
  id: "01a04e46-47d8-700f-b8cf-ef51ad3fe582",
  pageTypeSlug: "module",
  slug: "page-export-name",
  definition: "the names a page's slug makes, for the value it is bound to and for the type it is",
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
      statement: "The type a page type declares is that name with its first character raised.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here loads a module or reads the disk.",
    },
  ],
} as const satisfies Module
