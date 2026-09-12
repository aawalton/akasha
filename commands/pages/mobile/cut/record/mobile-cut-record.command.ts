import type { Command } from "akasha/commands/command.page-type.types.ts"

export const mobileCutRecord = {
  id: "01a0685d-ceae-7002-b932-ab750606b438",
  type: "command",
  slug: "mobile-cut-record",
  definition: "the command filing what a TestFlight build already at Apple was cut from",
  code: "ts",
  taking: [
    { said: "--build-number <n>", takes: "the number App Store Connect gave the build" },
    { said: "--main-sha <sha>", takes: "the code-repo commit the cut was taken at" },
    {
      said: "--shell-sha <sha>",
      takes: "the shell-repo commit the cut was taken at, where it named one",
    },
    { said: "--build-input-tree-hash <hash>", takes: "the build-input closure the cut worked out" },
    { said: "--cut-at <instant>", takes: "when the cut was taken, this moment where none is said" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A build already carrying a fingerprint is answered rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A build number is a whole number no lower than 1.",
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
  name: "record",
  arguments: [{ argument: "argument/app" }],
} as const satisfies Command
