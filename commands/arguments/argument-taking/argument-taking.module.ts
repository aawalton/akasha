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
      invariantKind: "departure",
      statement: "A word that is no flag fills the argument the command takes as a word.",
    },
    {
      invariantKind: "departure",
      statement: "An argument is taken at its flag only where the command takes it at a flag.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal names an argument the command takes as a word alone by its placeholder.",
    },
    {
      invariantKind: "departure",
      statement: "A word spelled as a flag is refused rather than filling an argument.",
    },
    {
      invariantKind: "departure",
      statement: "An argument said as a word and at its flag in one call is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Two arguments one call may not say together are refused where a call says both.",
    },
    {
      invariantKind: "departure",
      statement: "A pair both entries state is refused once.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command page's entries are read against the argument pages that command's code names.",
    },
    {
      invariantKind: "departure",
      statement: "The record answered holds the arguments the command page names and no other key.",
    },
    {
      invariantKind: "departure",
      statement: "An argument a command page needs is always answered.",
    },
    {
      invariantKind: "departure",
      statement:
        "An argument carrying a value a command page does not need is left out where nothing said it.",
    },
    {
      invariantKind: "departure",
      statement: "A command page naming no argument is answered with nothing taken.",
    },
    {
      invariantKind: "departure",
      statement:
        "A flag the command takes no argument at is refused rather than filling the argument before it.",
    },
    {
      invariantKind: "departure",
      statement: "A word opening with one dash the command takes no argument at is a value.",
    },
    {
      invariantKind: "departure",
      statement: "A bare dash is the value naming what is piped in rather than a flag.",
    },
  ],
} as const satisfies Module
