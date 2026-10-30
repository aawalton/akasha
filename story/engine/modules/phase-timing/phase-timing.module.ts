import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const phaseTiming = {
  id: "01a0e945-5def-7027-9139-7923bd22c6e4",
  type: "page-type/module",
  slug: "phase-timing",
  definition: "how long each phase of a story's process took, kept beside the story's page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A phase is written as one row of the phase timings beside the story's page as it ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A row names the phase rather than a status, so a turn and a chapter share one shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row's run is the turn or the chapter the phase was part of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row says the seat that ended the phase.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A phase starts where the latest other phase of the same run ended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run's first phase starts when the run's page was made, read off the page's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Phases running side by side all start where the phase before them ended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The player's phase runs from the last row of the run before to the making of the next run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A phase is picked up at the seat's first transcript line naming the run after the phase started.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Time before the pickup is waiting and time after it is working.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A phase no transcript line names says no waiting and no working.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A row of a one-seat turn also names the checklist step it ended, and the beat where there is one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A step starts where the latest row of the same run ended, of any phase, or at the run's making.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row naming a step keeps its phase and its phase's time as any other row does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row of a seat-graph turn names no step.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A phase that cannot be written refuses nothing it ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is kept as long as the phase timings keep every row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Phases are listed in the order they start within a run on average.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Under a phase, each step its rows name is drawn with its count and the middle, average and most.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A step's line folds every beat of that step together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A phase whose rows name no step is drawn with no line beneath it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run's whole time is from its first phase's start to its last phase's end, leaving out the player.",
    },
  ],
  createdAt: "2026-09-28T18:27:12.495Z",
  updatedAt: "2026-10-30T12:47:35.239Z",
} as const satisfies Module
