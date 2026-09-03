import type { Command } from "@akasha/command-system/command"

export const pipelineList = {
  id: "01a06810-9439-7fb3-9fbe-ffd716d66f77",
  pageTypeSlug: "command",
  slug: "pipeline-list",
  definition: "the command naming the CI pipelines that ran, newest first",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--branch <name>", takes: "hold the answer to the one branch named" },
    { said: "--status <s>", takes: "hold the answer to the one pipeline status named" },
    { said: "--limit <n>", takes: "the most pipelines given back, twenty where none is said" },
    { said: "--json", takes: "give the pipelines as JSON rather than as tab-separated rows" },
  ],
  helpNotes: [
    "the pipelines come newest first, ordered by the moment each was created.",
    "the age beside a pipeline is that moment measured against the moment this was called.",
    "the short sha is worked out from the full forty-character one rather than held beside it.",
    "what superseded a pipeline is the seq of the pipeline that overtook it.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pipelines are ordered by the moment each was created, newest first.",
    },
    {
      invariantKind: "departure",
      statement: "An age is measured against the moment this was called.",
    },
    {
      invariantKind: "departure",
      statement: "A short sha is worked out from the full one.",
    },
    {
      invariantKind: "departure",
      statement: "A sha that will not read is answered as an empty cell.",
    },
    {
      invariantKind: "departure",
      statement: "A branch and a status hold the answer together rather than either alone.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing matching is an empty answer rather than a refusal.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a workflow or a step.",
    },
  ],
} as const satisfies Command
