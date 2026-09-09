import type { Module } from "@akasha/code/module"

export const deployIosShipping = {
  id: "01a060e7-5945-7fc8-aab7-2db66ca0967f",
  pageTypeSlug: "module",
  type: "module",
  slug: "deploy-ios-shipping",
  definition: "an ios app built on the MacBook and handed to App Store Connect",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The build is the build the mobile commands already run.",
    },
    {
      invariantKind: "departure",
      statement: "A build is made at Release.",
    },
    {
      invariantKind: "departure",
      statement: "A build is made at the commit the call names.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no commit builds what HEAD is at.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no commit is refused where a tracked file differs from HEAD.",
    },
    {
      invariantKind: "departure",
      statement: "A commit named is built however the worktree differs from that commit.",
    },
    {
      invariantKind: "departure",
      statement: "A commit origin does not carry is pushed there before anything is built.",
    },
    {
      invariantKind: "departure",
      statement: "The push carries the branch each repository is on rather than the commit alone.",
    },
    {
      invariantKind: "departure",
      statement: "A push that fails refuses the call rather than building on.",
    },
    {
      invariantKind: "departure",
      statement: "The report names the commit asked for before anything is built.",
    },
    {
      invariantKind: "departure",
      statement: "A build takes its own number rather than being told a number.",
    },
    {
      invariantKind: "departure",
      statement: "An upload skipped still has Apple validate the signed build.",
    },
    {
      invariantKind: "departure",
      statement: "An upload carried out reaches every internal tester of the app.",
    },
    {
      invariantKind: "departure",
      statement: "One build runs at a time on this workstation.",
    },
    {
      invariantKind: "departure",
      statement: "The lock is released whether the build finished or threw.",
    },
    {
      invariantKind: "departure",
      statement: "A build that threw is the operation's fault rather than the caller's.",
    },
    {
      invariantKind: "departure",
      statement: "The lines the build said are carried back in the report rather than printed.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is said until the build has finished.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to an output stream.",
    },
    {
      invariantKind: "absence",
      statement: "The keychain password reaches no report.",
    },
  ],
} as const satisfies Module
