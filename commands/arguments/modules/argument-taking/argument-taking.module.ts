import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const argumentTaking = {
  id: "01a09419-fb82-7d05-a756-3f0e001dff28",
  type: "module",
  slug: "argument-taking",
  definition: "a command page's arguments read from a call through the words it says",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The arguments a command takes are handed in as pages rather than spelled here.",
    },
    {
      invariantKind: "constraint",
      statement:
        "An entry is read from its place in the list rather than found, since only some carry `required`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command page's entries are read against the argument pages that command's code names.",
    },
    {
      invariantKind: "departure",
      statement:
        "An argument page the code does not hand in is answered with no key rather than a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A command page naming no argument is answered with nothing taken.",
    },
    {
      invariantKind: "departure",
      statement: "The record answered holds the arguments the command page names and no other key.",
    },
    {
      invariantKind: "departure",
      statement: "The key an argument is answered under is that argument's slug written in camel.",
    },
    {
      invariantKind: "departure",
      statement: "An argument a command page needs is always answered.",
    },
    {
      invariantKind: "departure",
      statement: "An argument page carrying a default is always answered, as a needed one is.",
    },
    {
      invariantKind: "departure",
      statement: "An entry carrying a default is always answered, as a needed one is.",
    },
    {
      invariantKind: "departure",
      statement: "A default an entry carries is answered over the one the argument's page carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "An argument carrying no value or repeating is always answered, as a needed one is.",
    },
    {
      invariantKind: "departure",
      statement:
        "An argument carrying a value a command page does not need is left out where nothing said it.",
    },
    {
      invariantKind: "departure",
      statement: "The type a take answers is the one warning that an argument page was left out.",
    },
    {
      invariantKind: "absence",
      statement: "No word of the call is read here; the words go to the word-reading module.",
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
      statement:
        "A group a call must say one of is typed as a union over the members that may be absent.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pair one call may not say together is typed so checking one undefined narrows the other.",
    },
    {
      invariantKind: "departure",
      statement: "Which pairs a group forbids is read pair by pair and in either direction.",
    },
    {
      invariantKind: "departure",
      statement:
        "A member no pair forbids keeps the optional form, so a mixed group narrows in part.",
    },
    {
      invariantKind: "departure",
      statement:
        "A member always answered is never typed undefined, so a repeating one keeps its list.",
    },
    {
      invariantKind: "gap",
      statement:
        "Whether a group may hold a forbidden pair beside a free one is stated rather than allowed.",
    },
  ],
} as const satisfies Module
