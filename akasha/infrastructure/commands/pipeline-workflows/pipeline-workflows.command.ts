import type { Command } from "@akasha/command-system/command"

export const pipelineWorkflows = {
  id: "01a06810-9439-7b4e-b401-46a04e883a6a",
  pageTypeSlug: "command",
  slug: "pipeline-workflows",
  definition: "the command naming one pipeline's workflows with the steps that failed under each",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<seq>", takes: "the pipeline whose workflows to name, named by its seq" },
    { said: "--status <s>", takes: "hold the answer to the one workflow status named" },
    { said: "--json", takes: "give the workflows as JSON rather than as tab-separated rows" },
  ],
  helpNotes: [
    "the failed steps are the ones that made a workflow terminal-negative, which the step rollup writes onto the row.",
    "each named step's own reason and duration is what `pipeline-steps` gives, and it is not here.",
    "either step column says `unavailable` where the row carries no such attribute, which is not an empty list.",
    "no write path fills the blocked steps at all, because the rollup folds them into the failed ones.",
    "an absent list is said as unavailable rather than as empty, because an empty list reads as a measured nothing.",
    "a reason renders on any status, since the terminal cascade can sweep a blocked workflow without clearing it.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The failed steps are the ones the step rollup wrote onto the workflow's row.",
    },
    {
      invariantKind: "departure",
      statement: "An attribute the row does not carry is answered as unavailable.",
    },
    {
      invariantKind: "departure",
      statement: "Unavailable and an empty list are two answers rather than one.",
    },
    {
      invariantKind: "departure",
      statement: "The blocked steps are unavailable on every row.",
    },
    {
      invariantKind: "departure",
      statement: "A reason is the skip reason or the failed dependency, never both at once.",
    },
    {
      invariantKind: "departure",
      statement: "A reason is shown on any status rather than on the negative ones alone.",
    },
    {
      invariantKind: "departure",
      statement: "Whitespace inside a cell is squeezed to one space so a row stays one row.",
    },
    {
      invariantKind: "departure",
      statement: "A seq no pipeline stands at is refused before any workflow is read.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a step page.",
    },
  ],
} as const satisfies Command
