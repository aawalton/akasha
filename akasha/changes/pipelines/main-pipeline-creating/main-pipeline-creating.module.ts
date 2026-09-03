import type { Module } from "@akasha/code-system/module"

export const mainPipelineCreating = {
  id: "01a0686a-7a57-7aec-b110-13b5ff480e5b",
  pageTypeSlug: "module",
  slug: "main-pipeline-creating",
  definition: "one main pipeline per commit the merge queue lands",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A pipeline is created for the merge queue's main commit only where none stands for it.",
    },
    {
      invariantKind: "departure",
      statement: "Two pipelines standing at one commit are reported rather than added to.",
    },
    {
      invariantKind: "departure",
      statement: "Everything read and everything written is a file.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pipeline, its workflows and their steps are written in one pass, every seq minted before anything is written.",
    },
    {
      invariantKind: "departure",
      statement: "A new pipeline overtakes every pending pipeline standing on main.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pipeline already dispatching or running is not overtaken, and the new one waits behind it.",
    },
    {
      invariantKind: "departure",
      statement: "Which workflows a pipeline gets is decided against the commit's own tree.",
    },
    {
      invariantKind: "departure",
      statement:
        "A graph with no package edges, or missing a node for a changed file that was not deleted, ends the tick rather than creating a pipeline.",
    },
    {
      invariantKind: "departure",
      statement:
        "The diff is folded against the last pipelined ancestor on main, and against the commit's parent where there is none.",
    },
    {
      invariantKind: "departure",
      statement:
        "A commit already an ancestor of a pipelined commit is covered and creates nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick that has not answered inside its ceiling ends the process rather than a second tick starting beside it.",
    },
    {
      invariantKind: "departure",
      statement: "It runs until stopped, and a stop ends the loop at its next boundary.",
    },
  ],
} as const satisfies Module
