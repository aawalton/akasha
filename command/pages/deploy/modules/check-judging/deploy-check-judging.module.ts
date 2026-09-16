import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployCheckJudging = {
  id: "01a091ac-1ea6-7af9-a725-96a51aaf0c5f",
  type: "page-type/module",
  slug: "deploy-check-judging",
  definition: "the checks a deploy runs, over what changed since the last deploy that finished",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The checks a deploy runs are the checks stating they run on a deploy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change judged is the diff from the last deploy's commit to this one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That diff is narrowed to the files this deploy is built from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the deploy names to be judged joins that diff, changed or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service no deploy has finished for is judged over every file it is built from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change moves nothing, so each body is loaded where the body is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit written onto a page that git no longer holds is read as no commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change carrying no file is judged by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body is read out of the commit it belongs to rather than off the worktree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The reader the bodies come through is closed whether the judging passed or threw.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Checks that will not load refuse the deploy rather than passing it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the file and what the check said of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check refusing over what that check cost refuses no deploy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A deploy carries code a landing judged already, and that landing refused on cost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a check found still refuses the deploy.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says which files a deploy is built from.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here puts anything up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The change carries every file the deploy is built from, so the run reads that commit.",
    },
  ],
} as const satisfies Module
