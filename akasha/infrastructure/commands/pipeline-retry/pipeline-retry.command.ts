import type { Command } from "@akasha/command-system/command"

export const pipelineRetry = {
  id: "01a06810-9439-750f-9d06-251e8f1c18b8",
  pageTypeSlug: "command",
  slug: "pipeline-retry",
  definition: "the command setting one pipeline's failed work back to pending on the rows it holds",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "<seq>", takes: "the pipeline to retry, named by its seq" },
    {
      said: "--workflow <name>",
      takes: "retry this failed workflow and what is blocked behind it",
    },
    { said: "--json", takes: "give one object rather than tab-separated key and value lines" },
  ],
  helpNotes: [
    "the same pipeline page, the same commit and the same inputs are reused, so no new pipeline is made.",
    "this is the cure for a transient environmental failure at unchanged inputs, not for a changed one.",
    "the alternative is a fresh pipeline at a newer commit, which costs a run of every workflow rather than the failed subtree.",
    "everything read and everything written here is a file, and each write is guarded on the status it was decided from.",
    "nothing is dispatched here: the sweep service owns every move from pending onward and picks the subtree up on its next tick.",
    "naming no workflow takes every workflow of the pipeline standing at failed or blocked.",
    "naming one takes that workflow, which must be failed, plus every blocked workflow depending on it.",
    "a step that passed keeps its verdict, and its work on the CI store is reused.",
    "a reset step drops its whole husk: its container, its four moments, its exit code, its reason and every wait field.",
    "the node the pipeline was pinned to is never cleared, so only a fresh pipeline re-picks a host.",
    "a pipeline still underway, answered elsewhere, overtaken, or passed is refused with no writes at all.",
    "a pipeline standing at a commit that is no longer its branch tip is refused, since a retry on main redeploys it.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pipeline page, the commit and the inputs are the ones already standing.",
    },
    {
      invariantKind: "departure",
      statement: "Naming no workflow resets every one standing at failed or blocked.",
    },
    {
      invariantKind: "departure",
      statement: "A named workflow must be failed, and what is blocked behind it goes with it.",
    },
    {
      invariantKind: "departure",
      statement: "Only steps standing at failed or blocked are reset.",
    },
    {
      invariantKind: "departure",
      statement: "A step that passed keeps its verdict.",
    },
    {
      invariantKind: "departure",
      statement: "A reset step drops its whole husk rather than its status alone.",
    },
    {
      invariantKind: "departure",
      statement: "Each write is guarded on the status the reset was decided from.",
    },
    {
      invariantKind: "departure",
      statement: "The pipeline is moved off failed last, after every child is reset.",
    },
    {
      invariantKind: "departure",
      statement: "A step that starved for capacity is refused rather than reset.",
    },
    {
      invariantKind: "departure",
      statement: "A pipeline not standing at failed is refused with nothing written.",
    },
    {
      invariantKind: "departure",
      statement: "A pipeline whose commit is no longer its branch tip is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A pipeline that moved off failed while this was planned is answered as raced.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here dispatches a step or makes a pipeline.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here clears the node the pipeline was pinned to.",
    },
  ],
} as const satisfies Command
