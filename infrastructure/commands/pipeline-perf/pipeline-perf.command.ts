import type { Command } from "@akasha/command-system/command"

export const pipelinePerf = {
  id: "01a06810-9439-785a-b621-349b6085db38",
  pageTypeSlug: "command",
  slug: "pipeline-perf",
  definition: "the command timing one pipeline and every step that ran in it",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "<seq>", takes: "the pipeline to time, named by its seq" },
    { said: "--json", takes: "give one object rather than a header block and rows" },
  ],
  helpNotes: [
    "the steps are the only clock: a pipeline page carries no moment of its own, so every figure here is read off the step rows.",
    "the wall clock is the span from the earliest dispatch of any step to the latest completion of one.",
    "the gap between the pipeline being written and its first dispatch is counted by nothing and held by no store.",
    "while a pipeline is still running the wall clock is a floor, because the steps still going will move it.",
    "solo time is the part of a step's run when it was the only step going, and it is what duration cannot tell.",
    "a step reading above zero held the run open alone, so shortening it shortens the pipeline by at least that much.",
    "a step reading zero was never alone, and two steps in exact lockstep both read zero, so it is a floor.",
    "nothing here sees the dependency graph, so nothing here says which step gates which.",
    "the rows come ordered by duration, longest first.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every moment here is read off the step rows.",
    },
    {
      invariantKind: "departure",
      statement: "The wall clock is the span from the earliest dispatch to the latest completion.",
    },
    {
      invariantKind: "departure",
      statement: "A pipeline whose steps carry neither moment reports no wall clock.",
    },
    {
      invariantKind: "departure",
      statement: "A wall clock read while the pipeline runs is a floor rather than a reading.",
    },
    {
      invariantKind: "departure",
      statement: "A step duration is the completed moment less the started moment.",
    },
    {
      invariantKind: "departure",
      statement: "A step missing either moment is left out of the total step time.",
    },
    {
      invariantKind: "departure",
      statement: "A step's solo time is the part of its run when it was the only step going.",
    },
    {
      invariantKind: "departure",
      statement: "Solo time is a floor on what shortening that step would save.",
    },
    {
      invariantKind: "departure",
      statement: "The total solo time is the part of the wall clock that has a single owner.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are ordered by duration, longest first.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here sees which step gates which.",
    },
  ],
} as const satisfies Command
