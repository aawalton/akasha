import type { Module } from "@akasha/code-system/module"

export const authFailedRetry = {
  id: "01a0629f-9062-7001-bdc1-9f1651af79cd",
  pageTypeSlug: "module",
  slug: "auth-failed-retry",
  definition: "what a 401 becomes once the credential store is asked for a newer token",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The credential store is handed in as a function.",
    },
    {
      invariantKind: "departure",
      statement: "The store is asked for the account that met the 401.",
    },
    {
      invariantKind: "departure",
      statement: "A store holding no credential for the account ends the attempt.",
    },
    {
      invariantKind: "departure",
      statement: "A store holding the token that failed ends the attempt.",
    },
    {
      invariantKind: "departure",
      statement: "A store holding a token other than the one that failed is a retry.",
    },
    {
      invariantKind: "departure",
      statement: "Two credentials are told apart by access token alone.",
    },
    {
      invariantKind: "departure",
      statement: "A retry hands back a credential and no account.",
    },
    {
      invariantKind: "departure",
      statement: "An ended attempt hands back the body text read from the original.",
    },
    {
      invariantKind: "departure",
      statement: "An ended attempt hands back the status text of the original.",
    },
    {
      invariantKind: "departure",
      statement: "An ended attempt hands back the headers of the original.",
    },
    {
      invariantKind: "departure",
      statement: "An ended attempt hands back status 401.",
    },
    {
      invariantKind: "absence",
      statement: "A caller cannot tell a missing credential from an unchanged token.",
    },
    {
      invariantKind: "departure",
      statement: "Why an attempt ended is written to the error log.",
    },
    {
      invariantKind: "departure",
      statement: "A retry is written to the output log.",
    },
    {
      invariantKind: "departure",
      statement: "The error log names the whole trail of accounts rather than the current account.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a network.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller replays each account at most once.",
    },
    {
      invariantKind: "gap",
      statement: "The status handed back is 401 even where the original carries another status.",
    },
    {
      invariantKind: "gap",
      statement: "A body that cannot be read throws out of the attempt.",
    },
    {
      invariantKind: "gap",
      statement: "The body is read even where the attempt ends in a retry.",
    },
    {
      invariantKind: "gap",
      statement: "An ended attempt carries the content-encoding of a body already decoded.",
    },
    {
      invariantKind: "gap",
      statement: "An ended attempt carries the content-length of the compressed body.",
    },
  ],
} as const satisfies Module
