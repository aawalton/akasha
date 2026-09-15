import type { Command } from "akasha/command/command.page-type.types.ts"

export const initiativeAssign = {
  id: "01a0a57f-05fc-7d7e-ba15-9645284ba946",
  type: "command",
  slug: "initiative-assign",
  definition: "the command handing an initiative to the seat that initiative's name opens with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An initiative is named by the slug the initiative declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name that is no initiative is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The seat an initiative goes to is the seat named by the initiative's first segment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An initiative of one segment names the seat of that whole slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat that has no page is refused in words naming that seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat whose agent is not present is refused in words naming that seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat already answering to an initiative takes another initiative all the same.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The assignment stated names the initiative under the initiative page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Stating the assignment is left to the mechanical change for a relation.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An assignment reaching no page is refused by that change rather than here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run says the commit that run landed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads what a seat already answers to.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here asks Alan to confirm.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a body.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here starts a seat or stops a seat.",
    },
  ],
  name: "assign",
  arguments: [{ argument: "argument/initiative", required: true, saidAs: "word" }],
} as const satisfies Command
