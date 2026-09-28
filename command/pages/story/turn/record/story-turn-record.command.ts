import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyTurnRecord = {
  id: "01a0e98f-b822-7949-98b6-d204ffd0a478",
  type: "page-type/command",
  slug: "story-turn-record",
  definition:
    "the command sending a played turn at player that no recorder has run on through the recorders",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn landed at player without the recorders, as a story's opening is, is recorded here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a turn at player that names no recorder is recorded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A recording moves the turn to recorders and starts one fresh seat for each story recorder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The recorders then move the turn back to player as they move every other turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recording holds its turn from reading it to landing, as an advance does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any caller records a turn, whatever seat the caller sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A start that fails after the landing is told, and undoes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call naming a recorder is refused with the advance a recorder hands its step in by.",
    },
  ],
  name: "record",
  arguments: [
    { argument: "argument/played-turn", required: true },
    { argument: "argument/recorder", required: false },
  ],
} as const satisfies Command
