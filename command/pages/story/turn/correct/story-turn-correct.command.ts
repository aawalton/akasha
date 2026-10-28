import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyTurnCorrect = {
  id: "01a1831e-d939-7a0b-a8e4-2a0cd51219f5",
  type: "page-type/command",
  slug: "story-turn-correct",
  definition: "the command restating a shown beat's changes and prose in place",
  code: "ts",
  test: "ts",
  parts: ["module/beat-correcting", "module/correct-handing"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A correction restates one shown beat of a played turn, at player or at beats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A correction hands in the beat's changes, its prose, or both.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A beat not yet shown is stated again with an advance, and a correction refuses it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A correction takes back what the beat changed before it writes what the beat changes now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A correction checks the turn's outcome marks as the numbers recorder's last handing does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat corrected to change nothing is marked as stating no changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A correction rewrites the beat's prose in the turn's prose file and counts its words again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn with no prose file has the beat's prose rewritten on its beats line alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Everything a correction does lands in one landing, holding the turn as an advance does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's game master corrects a beat, and so does a caller in no story seat.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A correction writes nothing in the story's chat, since its game master says each fix there.",
    },
  ],
  name: "correct",
  arguments: [
    { argument: "argument/played-turn", required: true },
    { argument: "argument/beat", required: true },
    { argument: "argument/changes-file" },
    { argument: "argument/prose-file" },
  ],
  createdAt: "2026-10-28T15:26:39.416Z",
  updatedAt: "2026-10-28T15:31:07.945Z",
} as const satisfies Command
