import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const authFailedRetry = {
  id: "01a0629f-9062-7001-bdc1-9f1651af79cd",
  type: "page-type/module",
  slug: "auth-failed-retry",
  definition: "what a 401 becomes once the credential store is asked for a newer token",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The credential store is handed in as a function.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The store is asked for the account that met the 401.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A store with no credential for the account ends the attempt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A store with the token that failed ends the attempt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A store with a token other than the token that failed is a retry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two credentials are told apart by access token alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A retry hands back a credential and no account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ended attempt hands back the body text read from the original.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ended attempt hands back the status text of the original.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ended attempt hands back the headers of the original.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ended attempt hands back status 401.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A caller cannot tell a missing credential from an unchanged token.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Why an attempt ended is written to the error log.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A retry is written to the output log.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The error log names the whole trail of accounts rather than the current account.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a network.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A caller replays each account at most once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The status handed back is 401 even where the original has another status.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body that cannot be read is handed back empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body is read even where the attempt ends in a retry.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A caller hands in a response `forward` built, which has no content-encoding and no content-length.",
    },
  ],
} as const satisfies Module
