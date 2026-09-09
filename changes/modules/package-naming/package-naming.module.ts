import type { Module } from "@akasha/code/module"

export const packageNaming = {
  id: "01a08236-274a-7266-ab52-6e34c361587e",
  pageTypeSlug: "module",
  slug: "package-naming",
  definition: "a package's name where a string has it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name equal to the old name becomes the new name.",
    },
    {
      invariantKind: "departure",
      statement: "A name opening with the old name and a slash keeps the tail past that name.",
    },
    {
      invariantKind: "departure",
      statement: "A name with the old name anywhere else names no package renamed.",
    },
    {
      invariantKind: "departure",
      statement:
        "An alias is parted into the text up to its first colon, the package named, and the range.",
    },
    {
      invariantKind: "departure",
      statement:
        "The package an alias names is the text between that first colon and the last `@`.",
    },
    {
      invariantKind: "departure",
      statement: "A value with no colon is no alias.",
    },
    {
      invariantKind: "departure",
      statement: "A value whose last `@` opens the text after the colon is no alias.",
    },
    {
      invariantKind: "departure",
      statement: "Every specifier a body names a module by is read for the package.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier respelled is written as JSON spells it.",
    },
    {
      invariantKind: "departure",
      statement: "A string naming no module is left as that string is.",
    },
    {
      invariantKind: "departure",
      statement: "A naming handed in spells each specifier anew on its own rather than by prefix.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier the naming handed in does not name is left as that specifier is.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here rewrites a body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges whether a name may be renamed.",
    },
  ],
} as const satisfies Module
