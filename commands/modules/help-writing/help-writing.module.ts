import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const helpWriting = {
  id: "01a093f7-d398-7512-8b9c-b2446f05e2d3",
  type: "module",
  slug: "help-writing",
  definition: "what a command's page states, written down for a caller",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A help answer opens with the call and the definition handed for that call.",
    },
    {
      invariantKind: "departure",
      statement: "A call handed no definition opens with the call alone.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating what a command takes has a surface.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming the arguments it takes has a surface.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating nothing taken and naming no argument has none.",
    },
    {
      invariantKind: "departure",
      statement: "An argument a page names and states the taking of too is written down once.",
    },
    {
      invariantKind: "departure",
      statement: "That one line says what the argument's own page says the argument is for.",
    },
    {
      invariantKind: "departure",
      statement: "It keeps the place the taking gave it.",
    },
    {
      invariantKind: "departure",
      statement: "An argument the taking does not state is written under the ones it states.",
    },
    {
      invariantKind: "departure",
      statement: "A taking emptied of an argument still writes that argument down.",
    },
    {
      invariantKind: "absence",
      statement: "What an argument is for is handed in rather than read off that argument's page.",
    },
    {
      invariantKind: "departure",
      statement: "The arguments are padded to the widest of them so what each takes lines up.",
    },
    {
      invariantKind: "departure",
      statement: "The invariants a command's page states are written under the arguments.",
    },
    {
      invariantKind: "departure",
      statement: "An invariant is written down as the statement alone.",
    },
    {
      invariantKind: "departure",
      statement: "An entry stating no statement is written down nowhere.",
    },
    {
      invariantKind: "departure",
      statement:
        "An invariant of a kind that does not hold yet is written under a heading saying so.",
    },
    {
      invariantKind: "departure",
      statement: "The invariants that hold are written above that heading.",
    },
    {
      invariantKind: "departure",
      statement: "A page with no invariant of such a kind is written down with no heading.",
    },
    {
      invariantKind: "departure",
      statement: "Which kinds do not hold yet is settled by whoever hands them in.",
    },
    {
      invariantKind: "absence",
      statement: "No invariant of its own makes a page a page help is answered from.",
    },
    {
      invariantKind: "departure",
      statement: "A directive is written down as the rule that directive is.",
    },
    {
      invariantKind: "departure",
      statement: "The rules are written under the invariants, each after a blank line.",
    },
    {
      invariantKind: "departure",
      statement: "Which pages the rules were read off is settled by whoever hands them in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here loads a page.",
    },
  ],
} as const satisfies Module
