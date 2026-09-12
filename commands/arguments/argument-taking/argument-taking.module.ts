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
      invariantKind: "gap",
      statement:
        "A pair one call may not say together is answered as two arguments a call may leave out.",
    },
    {
      invariantKind: "gap",
      statement:
        "A command needing one of several arguments and none alone is refused here rather than typed.",
    },
    {
      invariantKind: "gap",
      statement: "Typing it needs the page to say whether one of a group is said or only one.",
    },
  ],
} as const satisfies Module
