import type { Module } from "@akasha/code/module"

export const gitAnswering = {
  id: "01a06816-2f10-79aa-bee4-b5831ee0eaca",
  pageTypeSlug: "module",
  type: "module",
  slug: "git-answering",
  definition: "a git command run without a throw, and the code and both streams it answered",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The repository is the folder git is run in rather than an argument to git.",
    },
    {
      invariantKind: "departure",
      statement: "A command git could not run is answered as data rather than thrown.",
    },
    {
      invariantKind: "departure",
      statement: "A folder that is no folder is answered before any process is started.",
    },
    {
      invariantKind: "departure",
      statement: "A process is started in a group of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The group is killed once the process ends.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling is stated in milliseconds and kills the group when the ceiling passes.",
    },
    {
      invariantKind: "departure",
      statement: "A run that passed its ceiling answers no code of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The git that is run is the git the environment names.",
    },
    {
      invariantKind: "departure",
      statement: "A run the environment names no git for runs `git`.",
    },
    {
      invariantKind: "departure",
      statement: "The streams git wrote are answered trimmed.",
    },
    {
      invariantKind: "departure",
      statement: "The raw door answers those streams untrimmed.",
    },
    {
      invariantKind: "gap",
      statement: "`git-running` runs git the other way.",
    },
    {
      invariantKind: "gap",
      statement: "The two doors are separate.",
    },
    {
      invariantKind: "gap",
      statement:
        "The fields are spelled as the callers spell those fields rather than as the runner does.",
    },
  ],
} as const satisfies Module
