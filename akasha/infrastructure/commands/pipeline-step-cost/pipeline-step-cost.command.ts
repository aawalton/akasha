import type { Command } from "@akasha/command-system/command"

export const pipelineStepCost = {
  id: "01a06810-9439-76ee-bab8-917af8d505fd",
  pageTypeSlug: "command",
  slug: "pipeline-step-cost",
  definition: "the command timing one named step over its recent runs across every pipeline",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<name>", takes: "the step to time, named exactly as a step row titles it" },
    { said: "--limit <n>", takes: "the runs read, newest first, twenty where none is said" },
    { said: "--json", takes: "give one object rather than a header block and rows" },
  ],
  helpNotes: [
    "the runs are the step's own across every branch, since a check runs on branch pipelines and staging alike.",
    "which branch a run came from rides as a column rather than as something the answer is held to.",
    "a duration is the completed moment less the started moment, and a step row carries no duration of its own.",
    "the row's updated moment keeps moving after the step ends, so it overstates the span and is not used.",
    "a run still in flight is listed with an empty duration and left out of the summary figures.",
    "the summary is the smallest, the middle and the largest rather than a mean.",
    "a step with a build cache is bimodal, reading one figure on a hit and another on a miss, and a mean lands between them.",
    "the middle is the mean of the two middle runs on an even count, so it does not snap to either mode.",
    "at most two hundred runs are read in one call.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The runs are the step's own across every branch rather than one branch's.",
    },
    {
      invariantKind: "departure",
      statement: "The branch a run came from is a column rather than a filter.",
    },
    {
      invariantKind: "departure",
      statement: "The runs come newest first.",
    },
    {
      invariantKind: "departure",
      statement: "A duration is the completed moment less the started moment.",
    },
    {
      invariantKind: "departure",
      statement: "A run still in flight is left out of the summary figures.",
    },
    {
      invariantKind: "departure",
      statement: "The summary is the smallest, the middle and the largest rather than a mean.",
    },
    {
      invariantKind: "departure",
      statement: "The middle of an even count is the mean of the two middle runs.",
    },
    {
      invariantKind: "departure",
      statement: "A call reads two hundred runs at most.",
    },
    {
      invariantKind: "departure",
      statement: "A step name no run carries is an empty answer rather than a refusal.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is held to one pipeline.",
    },
  ],
} as const satisfies Command
