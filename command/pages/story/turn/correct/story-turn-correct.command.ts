import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyTurnCorrect = {
  id: "01a1831e-d939-7a0b-a8e4-2a0cd51219f5",
  type: "page-type/command",
  slug: "story-turn-correct",
  definition: "the command restating a shown beat's changes and prose in place",
  code: "ts",
  test: "ts",
  parts: [
    "module/beat-correcting",
    "module/correct-handing",
    "module/beat-remembering",
    "module/correct-outcomes",
    "module/beat-retelling",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A correction restates one shown beat of a played turn, at player or at beats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A correction restates a beat of a played chapter as well, every beat of it shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter's outcome lines are its turns', and a correction refuses to replace them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A correction hands in the beat's changes, prose, memory or event, or the turn's outcomes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A correction takes back the lore its beat's old memory told, and tells its new memory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fact or knower the lore held before the turn, or another beat taught, stays.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Outcome lines handed in replace the turn's own, as many lines as it had.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An outcome line is replaced only where it states what it `added`, since no other is a beat's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A correction checks only the outcome lines its beat's changes mark, so beats go one by one.",
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
    { argument: "argument/memory-file" },
    { argument: "argument/outcomes-file" },
    { argument: "argument/beat-event" },
  ],
  createdAt: "2026-10-28T15:26:39.416Z",
  updatedAt: "2026-10-28T15:46:53.732Z",
} as const satisfies Command
