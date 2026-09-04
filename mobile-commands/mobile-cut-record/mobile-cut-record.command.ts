import type { Command } from "@akasha/command-system/command"

export const mobileCutRecord = {
  id: "01a0685d-ceae-7002-b932-ab750606b438",
  pageTypeSlug: "command",
  slug: "mobile-cut-record",
  definition: "the command filing what a TestFlight build already at Apple was cut from",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    {
      said: "--app <slug>",
      takes: "the app the build belongs to, the default app where none is said",
    },
    { said: "--build-number <n>", takes: "the number App Store Connect gave the build" },
    { said: "--main-sha <sha>", takes: "the code-repo commit the cut was taken at" },
    {
      said: "--shell-sha <sha>",
      takes: "the shell-repo commit the cut was taken at, where it named one",
    },
    { said: "--build-input-tree-hash <hash>", takes: "the build-input closure the cut worked out" },
    { said: "--cut-at <instant>", takes: "when the cut was taken, this moment where none is said" },
  ],
  helpNotes: [
    "this is the second caller for a filing the cut itself did not land, and the cut prints the call to make.",
    "the build number is the one the failed cut printed rather than a guess, since a wrong one files against a build that is not the one at Apple.",
    "a fingerprint filed without a build-input tree hash reads as predating the basis, which leaves a cut owed.",
    "the moment defaults to now, which is wrong for any filing that is not immediate.",
    "a build already carrying a fingerprint is said so and written by nothing.",
    "the fingerprint is what `mobile cut-status` compares origin/main against.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A build number is a whole number of at least one.",
    },
    {
      invariantKind: "departure",
      statement: "A moment that is no instant is refused rather than read as now.",
    },
    {
      invariantKind: "departure",
      statement: "A build the newest fingerprint already names is filed again by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A shell commit and a build-input hash are each absent rather than empty.",
    },
    {
      invariantKind: "departure",
      statement: "A page written without a commit taking it counts as nothing filed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches Apple or the mac.",
    },
  ],
} as const satisfies Command
