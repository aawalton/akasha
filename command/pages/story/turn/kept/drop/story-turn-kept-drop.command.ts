import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyTurnKeptDrop = {
  id: "01a0ea39-db28-7124-a2ce-64c6a8ac070c",
  type: "page-type/command",
  slug: "story-turn-kept-drop",
  definition: "the command taking one edit kept beside a played turn away without landing it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A drop takes away the one edit whose number a list gives, and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number naming no edit kept there is refused, and nothing is taken away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drop names the edit that went and how many edits are still kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drop leaving no edit takes the file those edits were in away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drop takes the lock every writer of those edits takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name that is no played turn here is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A drop lands nothing.",
    },
  ],
  name: "drop",
  arguments: [
    { argument: "argument/played-turn", required: true },
    { argument: "argument/kept-record", required: true },
  ],
} as const satisfies Command
