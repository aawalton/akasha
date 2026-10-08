import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questsSlashCommand = {
  id: "01a0635f-391c-7ae6-a1ab-5e89ac12419c",
  type: "page-type/module",
  slug: "quests-slash-command",
  definition: "the words the player types to turn answering dialogue and tracing on and off",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A command is registered with the game whether or not the hud is loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command is announced to the hud only where the hud is loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hud is told the name of the addon each command belongs to.",
    },
  ],
  createdAt: "2026-09-02T18:26:20.060Z",
  updatedAt: "2026-09-22T02:18:28.000Z",
} as const satisfies Module
