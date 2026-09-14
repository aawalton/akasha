import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const subagentStopRefusal = {
  id: "01a09c63-cc2f-7f77-a4b2-04dd27be1b1b",
  type: "module",
  slug: "subagent-stop-refusal",
  definition: "the 400 a stopped subagent's turn is answered",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent is named on a request by the `x-claude-code-agent-id` header.",
    },
    {
      invariantKind: "departure",
      statement: "A request with no such header names no subagent.",
    },
    {
      invariantKind: "departure",
      statement: "A header holding only whitespace names no subagent.",
    },
    {
      invariantKind: "departure",
      statement: "A request naming no subagent is refused by nothing, whatever is held.",
    },
    {
      invariantKind: "departure",
      statement: "A request naming a subagent nobody holds is refused by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal is a 400.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the error type `invalid_request_error`.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal has the anthropic error envelope.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the subagent and the agents panel.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal says every later turn of that subagent is refused too.",
    },
    {
      invariantKind: "departure",
      statement: "A response is sent as json.",
    },
    {
      invariantKind: "departure",
      statement: "A refused turn asks for that subagent's page to be taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A turn nobody stopped asks for no page to be taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A held set naming no take-down refuses the turn all the same.",
    },
    {
      invariantKind: "constraint",
      statement: "A seat's own turns carry no such header, so a seat is never refused here.",
    },
    {
      invariantKind: "constraint",
      statement: "A refused turn ends the subagent, and its seat reports the subagent as stopped.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
  ],
} as const satisfies Module
