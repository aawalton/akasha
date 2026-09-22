import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployIosShipping = {
  id: "01a060e7-5945-7fc8-aab7-2db66ca0967f",
  type: "page-type/module",
  slug: "deploy-ios-shipping",
  definition: "an ios app built on the MacBook and handed to App Store Connect",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The build is the build the mobile commands already run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build is made at Release.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build is made at the commit it is handed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the files on disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A ring credential the app bakes and nothing holds refuses the call before any push.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That refusal names the variable missing and the tiles a build would have had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit origin does not carry is pushed there before anything is built.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The push carries the branch each repository is on rather than the commit alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A push that fails refuses the call rather than building on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The report names the commit asked for before anything is built.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build takes its own number rather than being told a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An upload skipped still has Apple validate the signed build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An upload carried out reaches every internal tester of the app.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One build runs at a time on this workstation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lock is released whether the build finished or threw.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build that threw is the operation's fault rather than the caller's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lines the build said are carried back in the report rather than printed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is said until the build has finished.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes to an output stream.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The keychain password reaches no report.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The list this ship names things into is the one the cut names things into.",
    },
  ],
} as const satisfies Module
