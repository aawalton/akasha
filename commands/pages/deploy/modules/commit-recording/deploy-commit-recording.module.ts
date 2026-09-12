import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const deployCommitRecording = {
  id: "01a0918e-3f40-7004-a4ca-adca97c45186",
  type: "module",
  slug: "deploy-commit-recording",
  definition:
    "what a deploy put up or refused at, and when that deploy ended, kept beside the service's page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The commit is kept beside the page the deploy was read from.",
    },
    {
      invariantKind: "departure",
      statement: "A commit that was put up and a commit that refused are kept under two keys.",
    },
    {
      invariantKind: "departure",
      statement: "A page already keeping that commit is written to by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The commit is kept uncommitted, so keeping it lands no change.",
    },
    {
      invariantKind: "departure",
      statement: "A write that failed is answered as what went wrong rather than thrown.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here settles whether a deploy finished.",
    },
    {
      invariantKind: "departure",
      statement: "The moment a deploy ended is kept whether that deploy put up or refused.",
    },
    {
      invariantKind: "departure",
      statement: "A moment that will not parse is read as no moment rather than as the epoch.",
    },
    {
      invariantKind: "departure",
      statement:
        "A deploy that refused keeps that one moment under both the ending's key and the refusal's.",
    },
  ],
} as const satisfies Module
