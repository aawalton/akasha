import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const commitAttribution = {
  id: "01a09c10-91c9-7a57-80f8-b3c2ffe0962c",
  type: "page-type/module",
  slug: "commit-attribution",
  definition: "the lines a commit message ends with naming the model and the session that wrote it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every commit a landing writes carries the attribution.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The attribution is composed by the command rather than typed by the agent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The attribution lines come last in the message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A message already carrying a trailer key does not take a second line under that key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key already there is matched whatever case it is written in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each key is settled on its own, so a message carrying one of the two gains only the other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A message whose last block is all trailers takes the attribution with no blank line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subject line holding a colon is prose rather than a trailer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A model is named as Claude followed by the title its model version states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The title is read off the model version's page rather than worked out from its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit no model is recorded for is co-authored as Claude.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The model is read as the model version a seat records.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A model no model version's page carries is co-authored as Claude.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent records no model and is answered from the seat that ran it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No session line is written where no session is known.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat page states the session the attribution names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A session is named only where the end of the seat's transcript names that session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session not proven current at the commit is left out rather than named stale.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent states no session and is answered from the seat that ran it.",
    },
  ],
} as const satisfies Module
