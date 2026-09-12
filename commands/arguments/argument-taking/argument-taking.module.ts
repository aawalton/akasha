import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const argumentTaking = {
  id: "01a09419-fb82-7d05-a756-3f0e001dff28",
  type: "module",
  slug: "argument-taking",
  definition: "a call's words read against the argument pages the command naming them states",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The arguments a command takes are handed in as pages rather than spelled here.",
    },
    {
      invariantKind: "departure",
      statement:
        "An argument no page the command names carries is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names every argument the command takes.",
    },
    {
      invariantKind: "departure",
      statement:
        "An argument carrying no value is true where a call says it and false where none does.",
    },
    {
      invariantKind: "departure",
      statement: "A whole number is answered as a number and true or false as true or false.",
    },
    {
      invariantKind: "departure",
      statement: "A repeating argument gathers its values in the order the values are said.",
    },
    {
      invariantKind: "departure",
      statement: "A repeating argument no call said is an empty list.",
    },
    {
      invariantKind: "departure",
      statement: "An argument that does not repeat is refused where one call says it twice.",
    },
    {
      invariantKind: "departure",
      statement: "An argument whose value is another argument is an argument no value follows.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a command needs an argument is handed in rather than read off the argument.",
    },
    {
      invariantKind: "departure",
      statement: "Every refusal a call earns is gathered rather than the first alone.",
    },
    {
      invariantKind: "departure",
      statement: "The key an argument is answered under is that argument's slug written in camel.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page or reaches an index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here prints.",
    },
    {
      invariantKind: "gap",
      statement: "A word that is no flag is an argument a command names for that word.",
    },
    {
      invariantKind: "gap",
      statement: "Two arguments one call may not say together are refused together.",
    },
  ],
} as const satisfies Module
