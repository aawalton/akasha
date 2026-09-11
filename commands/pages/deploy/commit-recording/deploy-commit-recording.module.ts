import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const deployCommitRecording = {
  id: "01a0918e-3f40-7004-a4ca-adca97c45186",
  type: "module",
  slug: "deploy-commit-recording",
  definition: "the commit a deploy put up or refused at, kept beside the service's page",
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
  ],
} as const satisfies Module
