import type { Module } from "akasha/code/module/module.page-type.types.ts"

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
      invariantKind: "invariant-kind/departure",
      statement: "The arguments a command takes are handed in as pages rather than spelled here.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "An entry is read from its place in the list rather than found, since only some carry `required`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A command page's entries are read against the argument pages that command's code names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An argument page the code does not hand in is answered with no key rather than a refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command page naming no argument is answered with nothing taken.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The record answered holds the arguments the command page names and no other key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key an argument is answered under is that argument's slug written in camel.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An argument a command page needs is always answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An argument page carrying a default is always answered, as a needed one is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry carrying a default is always answered, as a needed one is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A default an entry carries is answered over the one the argument's page carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An argument carrying no value or repeating is always answered, as a needed one is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An argument carrying a value a command page does not need is left out where nothing said it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The type a take answers is the one warning that an argument page was left out.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No word of the call is read here; the words go to the word-reading module.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a page or reaches an index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here prints.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A group a call must say one of is typed as a union over the members that may be absent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A pair one call may not say together is typed so checking one undefined narrows the other.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which pairs a group forbids is read pair by pair and in either direction.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A member no pair forbids keeps the optional form, so a mixed group narrows in part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A member always answered is never typed undefined, so a repeating one keeps its list.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "Whether a group may hold a forbidden pair beside a free one is stated rather than allowed.",
    },
  ],
} as const satisfies Module
