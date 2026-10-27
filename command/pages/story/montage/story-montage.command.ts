import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyMontage = {
  id: "01a17ef5-e63b-7d66-8b7e-d812cccdc2a8",
  type: "page-type/command",
  slug: "story-montage",
  definition: "the command settling a played story's repeated activity session by session",
  code: "ts",
  parts: ["module/montage-placing", "module/montage-running", "module/montage-taking"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A montage is settled only on a turn at game-master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A montage is bounded by sessions, an end, a crossing, or any mix of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The story's check `<story>-time-passing` passes each session's time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story with no such check runs no montage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story with a check `<story>-upkeep` charges it every session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A montage of a story charging upkeep is handed the upkeep's first reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Dice are rolled and moved by difficulty as `akasha story settle` rolls them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every session's lines, what they add and the last end land in one landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The answer names each crossing and each leaving with its session's end, and the stop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A montage stopped before any session lands nothing and says why.",
    },
  ],
  name: "montage",
  arguments: [
    { argument: "argument/story", required: true },
    { argument: "argument/settled-check", required: true },
    { argument: "argument/reading", required: true },
    { argument: "argument/every-minutes", required: true },
    { argument: "argument/dice", required: false },
    { argument: "argument/upkeep-reading", required: false },
    { argument: "argument/sessions", required: false },
    { argument: "argument/until-instant", required: false },
    { argument: "argument/crossing", required: false },
    { argument: "argument/played-turn", required: false },
  ],
  createdAt: "2026-10-27T20:03:26.902Z",
  updatedAt: "2026-10-27T20:03:26.902Z",
} as const satisfies Command
