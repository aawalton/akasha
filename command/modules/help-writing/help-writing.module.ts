import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const helpWriting = {
  id: "01a093f7-d398-7512-8b9c-b2446f05e2d3",
  type: "module",
  slug: "help-writing",
  definition: "what a command's page states, written down for a caller",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A help answer opens with the call and the definition handed for that call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call handed no definition opens with the call alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page naming the arguments it takes has a surface.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page naming no argument is read as taking nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command whose page is nowhere has no surface.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "What an argument is for is handed in rather than read off that argument's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The arguments are padded to the widest of them so what each takes lines up.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The invariants a command's page states are written under the arguments.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An invariant is written down as the statement alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry stating no statement is written down nowhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An invariant of a kind that does not hold yet is written under a heading saying so.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The invariants that hold are written above that heading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page with no invariant of such a kind is written down with no heading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which kinds do not hold yet is settled by whoever hands them in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No invariant of its own is read as something a command takes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A directive is written down as the rule that directive is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rules are written under the invariants, each after a blank line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which pages the rules were read off is settled by whoever hands them in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here loads a page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry's name and how that command takes it are both read off the entry.",
    },
  ],
} as const satisfies Module
