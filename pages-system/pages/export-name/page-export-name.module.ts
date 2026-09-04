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
      invariantKind: "departure",
      statement: "A slug that cannot become a page's export name is answered here with why.",
    },
    {
      invariantKind: "departure",
      statement: "A name opening with a digit is no identifier, so the slug making it is at fault.",
    },
    {
      invariantKind: "departure",
      statement: "A name TypeScript keeps for itself is at fault though it is an identifier.",
    },
    {
      invariantKind: "departure",
      statement: "A word reserved only under strict mode is kept too, because a page is a module.",
    },
    {
      invariantKind: "departure",
      statement: "What is at fault is said as the name the slug makes rather than as the slug.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here loads a module or reads the disk.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a page, an index or a change.",
    },
  ],
} as const satisfies Module
