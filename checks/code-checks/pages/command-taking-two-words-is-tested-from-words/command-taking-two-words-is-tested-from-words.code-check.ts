import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const commandTakingTwoWordsIsTestedFromWords = {
  id: "01a0952b-e27f-7c8d-97ee-d208aac7ceb3",
  type: "code-check",
  slug: "command-taking-two-words-is-tested-from-words",
  definition: "the check refusing a command whose word order is asserted by no test",
  runsOnChange: false,
  runsOnDeploy: false,
  runsOnWorktree: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command filling two or more arguments from words is judged.",
    },
    {
      invariantKind: "departure",
      statement: "An argument taken at its flag or as a word is counted as a word.",
    },
    {
      invariantKind: "departure",
      statement: "The test beside the command page is the one read.",
    },
    {
      invariantKind: "departure",
      statement: "A test calling the reader of those words with them pins the order.",
    },
    {
      invariantKind: "departure",
      statement: "A command with no test beside it is refused by that absence.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal says that a word is taken by the place its argument sits at.",
    },
    {
      invariantKind: "departure",
      statement: "Only a command's page is judged, and its code is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A file outside `commands/pages` is refused nothing.",
    },
    {
      invariantKind: "departure",
      statement: "This check runs on no phase, so it binds nobody and states its rule only.",
    },
    {
      invariantKind: "upkeep",
      statement: "Every command filling two or more arguments from words has a test filling them.",
    },
    {
      invariantKind: "departure",
      statement: "The phases come on once Alan approves the check.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads which order the words are in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges a command filling one argument from words.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CodeCheck
