import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const packageNaming = {
  id: "01a08236-274a-7266-ab52-6e34c361587e",
  type: "module",
  slug: "package-naming",
  definition: "a package's name where a string has it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name equal to the old name becomes the new name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name opening with the old name and a slash keeps the tail past that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name with the old name anywhere else names no package renamed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every specifier a body names a module by is read for the package.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A specifier respelled is written as JSON spells that specifier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A string naming no module is left as that string is.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk or the index.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here rewrites a body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges whether a name may be renamed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No package or path this module's test names is one this repository has.",
    },
  ],
} as const satisfies Module
