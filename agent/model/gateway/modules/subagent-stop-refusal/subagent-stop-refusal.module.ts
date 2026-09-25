import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const subagentStopRefusal = {
  id: "01a09c63-cc2f-7f77-a4b2-04dd27be1b1b",
  type: "page-type/module",
  slug: "subagent-stop-refusal",
  definition: "the refusal that code sends to a subagent that is stopped",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent is named on a request by the `x-claude-code-agent-id` header.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request with no such header names no subagent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A header holding only whitespace names no subagent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request naming no subagent is refused by nothing, whatever is held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request naming a subagent nobody holds is refused by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal is a 400.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the error type `invalid_request_error`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal has the anthropic error envelope.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the subagent and the agents panel.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal says every later turn of that subagent is refused too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A response is sent as json.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refused turn asks for that subagent's page to be taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn nobody stopped asks for no page to be taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A held set naming no take-down refuses the turn all the same.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A seat's own turns carry no such header, so a seat is never refused here.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A refused turn ends the subagent, and its seat reports the subagent as stopped.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a clock.",
    },
  ],
} as const satisfies Module
