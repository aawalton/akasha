import type { Module } from "@akasha/code-system/module"

export const pipelineDriving = {
  id: "01a0686a-7a57-71ad-ba45-879576c1ce12",
  pageTypeSlug: "module",
  slug: "pipeline-driving",
  definition: "every pipeline still short of a verdict driven on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "One workstation process drives every pipeline, and it reads the pipeline, workflow and step pages as files.",
    },
    {
      invariantKind: "departure",
      statement: "A pipeline short of a verdict is one reading pending, dispatching or running.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pipeline that reached a verdict itself while still holding a workflow or a step that has not is counted short of one too.",
    },
    {
      invariantKind: "departure",
      statement:
        "A settled parent over unsettled children is reported as healing, one line to a pipeline.",
    },
    {
      invariantKind: "departure",
      statement:
        "A failed pipeline with a newer pipeline on the same branch is answered elsewhere once every workflow it failed or blocked on has passed on a later pipeline of that branch.",
    },
    {
      invariantKind: "departure",
      statement:
        "Answering a pipeline elsewhere carries to its failed and blocked workflows and to their failed and blocked steps.",
    },
    {
      invariantKind: "absence",
      statement: "No pipeline worker is dispatched from here, and none is dispatched anywhere.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a pipeline worker did is work on the pages themselves, so it stands on the workstation as a service of its own rather than on the cluster.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the cluster.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tick still working when its ceiling passes ends the process rather than letting a second one start beside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The loop runs until it is asked to stop, and a stop ends it at the next boundary.",
    },
  ],
} as const satisfies Module
