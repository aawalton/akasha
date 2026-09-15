import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gitAnswering = {
  id: "01a06816-2f10-79aa-bee4-b5831ee0eaca",
  type: "module",
  slug: "git-answering",
  definition: "a git command run without a throw, and the code and both streams it answered",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The repository is the folder git is run in rather than an argument to git.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command git could not run is answered as data rather than thrown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder that is no folder is answered before any process is started.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process is started in a group of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The group is killed once the process ends.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A ceiling is stated in milliseconds and kills the group when the ceiling passes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that passed its ceiling answers no code of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The git that is run is the git the environment names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run the environment names no git for runs `git`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The streams git wrote are answered trimmed.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "`git-running` runs git the other way.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The two doors are separate.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "The fields are spelled as the callers spell those fields rather than as the runner does.",
    },
  ],
} as const satisfies Module
