import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const packageNaming = {
  id: "01a08236-274a-7266-ab52-6e34c361587e",
  type: "module",
  slug: "package-naming",
  definition: "a package's name where a string has it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name equal to the old name becomes the new name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name opening with the old name and a slash keeps the tail past that name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name with the old name anywhere else names no package renamed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every specifier a body names a module by is read for the package.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A specifier respelled is written as JSON spells that specifier.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A string naming no module is left as that string is.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the disk or the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here rewrites a body.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges whether a name may be renamed.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No package or path this module's test names is one this repository has.",
    },
  ],
} as const satisfies Module
