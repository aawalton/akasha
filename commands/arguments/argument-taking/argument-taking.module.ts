import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const argumentTaking = {
  id: "01a09419-fb82-7d05-a756-3f0e001dff28",
  type: "module",
  slug: "argument-taking",
  definition: "a call's words read against the argument pages the command naming them states",
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
      statement: "An argument carrying no value is taken once where one call says it twice.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value that will not narrow is refused for the value alone rather than as one nothing said.",
    },
    {
      invariantKind: "departure",
      statement: "A value is read whole, so the spaces around it are the value's own.",
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
      statement: "A word that is no flag fills the arguments taken as words, in the order named.",
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
      statement:
        "A refusal names an argument the way the call reached it, and both ways where none did.",
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
      statement: "A group one call must say one of is refused where a call says none of them.",
    },
    {
      invariantKind: "departure",
      statement: "Arguments naming each other that way are one group rather than pairs.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names every argument in the group and is said once.",
    },
    {
      invariantKind: "departure",
      statement: "A value that will not narrow still answers for the group it is in.",
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
      statement: "An argument page carrying a default is always answered, as a needed one is.",
    },
    {
      invariantKind: "departure",
      statement: "A default is read as a said value is read, so a whole number answers a number.",
    },
    {
      invariantKind: "departure",
      statement: "A call saying an argument takes that value over the default.",
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
    {
      invariantKind: "departure",
      statement:
        "How many times a call may say an argument is handed in rather than read off the argument.",
    },
    {
      invariantKind: "departure",
      statement:
        "An argument page the code does not hand in is answered with no key rather than a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The type a take answers is the one warning that an argument page was left out.",
    },
    {
      invariantKind: "departure",
      statement: "A repeating word argument takes every word from its own place on.",
    },
    {
      invariantKind: "departure",
      statement: "More words than a command takes are refused saying how many either side is.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every word after a bare `--` fills a word argument rather than being read as a flag.",
    },
    {
      invariantKind: "gap",
      statement:
        "An argument is known to be needed here, and what that argument must be one of is not.",
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
      invariantKind: "departure",
      statement:
        "A set read at run time is weighed by adding to this refusal rather than by reading the call.",
    },
    {
      invariantKind: "departure",
      statement: "An argument said `--flag=value` carries what follows the first equals.",
    },
    {
      invariantKind: "departure",
      statement:
        "An argument said with an equals and nothing after it is refused rather than carrying nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A value opening with two dashes is handed to a flag written with an equals.",
    },
    {
      invariantKind: "departure",
      statement: "An argument carrying no value is refused where a call writes an equals after it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A word said after a bare `--` keeps an equals in it rather than being parted at one.",
    },
  ],
} as const satisfies Module
