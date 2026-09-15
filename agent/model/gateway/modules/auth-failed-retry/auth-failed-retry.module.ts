import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const authFailedRetry = {
  id: "01a0629f-9062-7001-bdc1-9f1651af79cd",
  type: "page-type/module",
  slug: "auth-failed-retry",
  definition: "what a 401 becomes once the credential store is asked for a newer token",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The credential store is handed in as a function.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The store is asked for the account that met the 401.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A store with no credential for the account ends the attempt.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A store with the token that failed ends the attempt.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A store with a token other than the token that failed is a retry.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two credentials are told apart by access token alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A retry hands back a credential and no account.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ended attempt hands back the body text read from the original.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ended attempt hands back the status text of the original.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ended attempt hands back the headers of the original.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ended attempt hands back status 401.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A caller cannot tell a missing credential from an unchanged token.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Why an attempt ended is written to the error log.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A retry is written to the output log.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The error log names the whole trail of accounts rather than the current account.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches a network.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller replays each account at most once.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The status handed back is 401 even where the original has another status.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A body that cannot be read throws out of the attempt.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The body is read even where the attempt ends in a retry.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "An ended attempt has the content-encoding of a body already decoded.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "An ended attempt has the content-length of the compressed body.",
    },
  ],
} as const satisfies Module
