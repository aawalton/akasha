import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const auditListening = {
  id: "01a0a6a5-0a65-78f1-9909-32f3e63bc7ea",
  type: "page-type/module",
  slug: "audit-listening",
  definition: "the port a round of the audit is asked for on, and what answers there",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The port and the host names are read off the service's page by its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page stating no port ends the run rather than leaving a service that answers nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A host name that will not bind ends the run, for the service to start again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A round is asked for at one path, and nothing is asked for at another.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A round is asked for by POST rather than by another method.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body that is no JSON object is refused rather than read as naming no check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body naming no check asks for every check that runs at audit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body naming checks asks for those checks and no other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name in that list that is no string is refused rather than dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body names the commit the round is to judge at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body naming no commit is refused rather than read as the head the service holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit a body names reaches the round beside the checks that body names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the round answered is the whole of what comes back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The round this service answers with is handed in when the service binds.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here falls back to a round of its own where none is handed in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says which checks there are.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs a check or writes a verdict.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Importing this module's file binds nothing.",
    },
  ],
} as const satisfies Module
