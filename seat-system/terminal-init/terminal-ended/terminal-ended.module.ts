import type { Module } from "@akasha/code-system/module"

export const terminalEnded = {
  id: "01a0680a-fa30-7c8e-b940-a8c983ec63d0",
  pageTypeSlug: "module",
  slug: "terminal-ended",
  definition: "how an editor terminal's shell ended, left beside that terminal's own page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What is left names when the shell ended, what it ended with and where it stood.",
    },
    {
      invariantKind: "departure",
      statement: "A shell is told apart from a later shell of the same pid by when it started.",
    },
    {
      invariantKind: "departure",
      statement: "The start is read out of the shell's own entry in the process table.",
    },
    {
      invariantKind: "departure",
      statement: "A status above a hundred and twenty-eight names the signal that ended the shell.",
    },
    {
      invariantKind: "departure",
      statement: "A hangup is recorded and then re-raised so the shell dies of what reached it.",
    },
    {
      invariantKind: "departure",
      statement: "Only a terminal the editor opened is trapped.",
    },
    {
      invariantKind: "departure",
      statement: "A shell that could not leave a record ends as it would have ended anyway.",
    },
    {
      invariantKind: "departure",
      statement: "What is left sits beside the pages of the page type it describes.",
    },
    {
      invariantKind: "departure",
      statement: "A folder not there yet is made rather than the record being dropped.",
    },
  ],
} as const satisfies Module
