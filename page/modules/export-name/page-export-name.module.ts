import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageExportName = {
  id: "01a04e46-47d8-700f-b8cf-ef51ad3fe582",
  type: "module",
  slug: "page-export-name",
  definition: "the names a page's slug makes, for the value it is bound to and for the type it is",
  code: "ts",
  parts: ["module/export-naming", "module/export-spelling"],
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The slug this module is handed is one already held to lower kebab case.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A `-` a lowercase ascii letter or an ascii digit follows is dropped and that character is raised.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `-` anything else follows stays where it is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A letter outside ascii is kept as the slug spells it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The type a page type declares is that name with its first character raised.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug that cannot become a page's export name is answered here with why.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name opening with a digit is no identifier.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The slug making such a name is at fault.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A name TypeScript keeps for itself is at fault though that name is an identifier.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A word reserved only under strict mode is kept too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is a module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The fault is said as the name the slug makes rather than as the slug.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here loads a module or reads the disk.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches a page or an index or a change.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here folds a key that is no slug.",
    },
  ],
} as const satisfies Module
