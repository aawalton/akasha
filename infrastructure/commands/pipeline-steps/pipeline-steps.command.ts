import type { Command } from "@akasha/command-system/command"

export const pipelineSteps = {
  id: "01a06810-9439-76f8-a4b2-edd6edb991fb",
  pageTypeSlug: "command",
  slug: "pipeline-steps",
  definition:
    "the command naming one pipeline's steps with the status, wait and reason each carries",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<seq>", takes: "the pipeline whose steps to name, named by its seq" },
    { said: "--workflow <name>", takes: "hold the answer to the steps of the one workflow named" },
    { said: "--status <s>", takes: "hold the answer to the one step status named" },
    { said: "--json", takes: "give the steps as JSON rather than as tab-separated rows" },
  ],
  helpNotes: [
    "the reason is the most specific one the row holds, narrowing from failure to skip to launch refusal to what blocked it.",
    "a reason shows on every status, because a step that failed is often moved to resolved or superseded afterwards.",
    "a step dispatching with no pod is normally queued on node capacity, which reads the same as a wedge without the wait column.",
    "a queued step names the node and how long it has waited, where a wedged step leaves the wait blank.",
    "the wait survives the step going terminal, and its age stops growing at the step's own completed moment.",
    "a duration is the completed moment less the started moment, worked out as the row is rendered.",
    "the row's updated moment keeps moving after the step ends, so it is no end time, and no step carries a duration.",
    "a key holding nothing is left out of the JSON object rather than given as null, so test for presence.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A duration is the completed moment less the started moment.",
    },
    {
      invariantKind: "departure",
      statement: "No step row carries a duration of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The reason is the most specific one the row holds.",
    },
    {
      invariantKind: "departure",
      statement: "A reason is shown on every status rather than on the failed ones alone.",
    },
    {
      invariantKind: "departure",
      statement: "A step queued on node capacity is told from a wedged step by the wait it names.",
    },
    {
      invariantKind: "departure",
      statement: "A wait names the node the step is queued on and how long it has waited.",
    },
    {
      invariantKind: "departure",
      statement: "A wait's age stops growing at the step's own completed moment.",
    },
    {
      invariantKind: "departure",
      statement: "A key holding nothing is left out rather than given as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A workflow no step of this pipeline stands under is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a pod log.",
    },
  ],
} as const satisfies Command
