import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const subagentRecovering = {
  id: "01a08d67-3a64-7f77-bb80-0d2661de12d7",
  type: "module",
  slug: "subagent-recovering",
  definition:
    "what a subagent left beside its page, moved between that page and the seat that dispatched it",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The edits beside a subagent's page are the edits that subagent never landed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An apply drops the rows it landed, so what is left was never landed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusals beside a subagent's page are what the last landing it tried gave.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run refusing nothing takes that file away, so a file there was never answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every line is appended to the seat rather than replacing what the seat has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An edit appended says which subagent left it and when the seat took it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The time a line says is when the seat took the line rather than when the edit was drafted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "When an edit was drafted is said by nothing this move reads.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every edit one move appends says the same time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line that reads as no object is appended unchanged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal appended is opened by the slug of the subagent whose refusal it was.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One blank line parts the refusals of two subagents.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The readings beside a subagent's page are what that subagent has read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading appended says the agent id that reading was made by.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The agent id is read off the page that is going.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page stating no agent id moves no reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading appended is beside the seat rather than among the seat's own readings.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading the seat keeps goes back to the page the agent id it says takes up.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading goes back without the agent id the seat kept it under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading the seat keeps under another agent id is left where it is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading goes back before what the page already holds rather than after it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seat's file goes once the last reading it kept has gone back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading the seat keeps is dropped where its agent id is handed in as gone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading naming no agent id is never dropped that way.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which agents are gone is handed in rather than judged here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here weighs whether an agent handed in as gone could return.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which agents a seat keeps readings for is answered off the seat's own file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading goes where its agent's last record predates the client handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That agent's last record is read where the module for outliving reads it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The client's start and the transcript are handed in rather than reached for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading kept under a seat id other than the one handed in is left alone.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No reading goes for how long its agent has been quiet.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seat's file goes once the last reading it kept has been dropped.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent with nothing beside it moves nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What was moved is taken from beside the subagent rather than copied.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A second move over the same subagent therefore moves nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sweep refused after a move leaves what moved reachable from the seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write here takes a lock keyed on the file the write writes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The paths written are the ones the seat page type names rather than spelled here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page taken away that is no subagent moves nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seat a subagent's edits move onto is the seat that subagent's page names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent whose seat the index files no page for moves nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here takes a page away.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges whether a subagent is gone.",
    },
  ],
} as const satisfies Module
