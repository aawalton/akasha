import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployHolding = {
  id: "01a0958d-5a26-70f4-b71a-0d770b87de98",
  type: "page-type/module",
  slug: "deploy-holding",
  definition:
    "the hold a deploy takes over the thing it puts up, so no second deploy of that thing runs",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The hold is one file named for the thing being put up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hold sits under the folder git keeps the checkout in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Taking the hold is one create that fails where the hold is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hold names the process holding it and the moment that process started.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy finding a hold a live process keeps waits for that deploy to end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hold left by a process that is gone is taken rather than waited on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A hold naming no process is waited on until it has sat for ten seconds, and then taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy that ends keeps its commit and its answer beside the hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy that threw keeps no answer there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A deploy that waited answers with a deploy that went up carrying the commit it arrived with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A deploy that waited answers with a deploy begun after it arrived that carries its commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "It answers with that deploy whether that deploy went up or refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every other deploy that waited takes the hold, so one of them puts up and the rest wait on that one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy that finds the hold free puts up without asking what went up before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no commit is made at the commit HEAD is at when it takes the hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call naming no commit is carried by a deploy made at or after the commit HEAD was at on arrival.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit named on the call is carried only by a deploy made at that commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer carried from another deploy says which deploy carried it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A waiting deploy counts its ceiling afresh when the hold changes hands and when it takes the hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hold is released however the deploy inside it ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hold is released only by the process whose mark the file carries.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here holds two things apart that are put up separately.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which things have a deploy running is read off the holds a live process keeps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hold left by a process that is gone says no deploy is running.",
    },
  ],
} as const satisfies Module
