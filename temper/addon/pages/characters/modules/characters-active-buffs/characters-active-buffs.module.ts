import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersActiveBuffs = {
  id: "01a15ca2-dc2f-7ddf-966d-ef4024e03d35",
  type: "page-type/module",
  slug: "characters-active-buffs",
  definition:
    "the buffs on the player, each with the Weapon and Spell Damage held as it last began",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each buff is kept with its ability id, its name, its text, its effect text and its stacks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A buff begins when it is gained and again each time it is refreshed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A buff that fades forgets the power it began with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A buff gained before load has no onset to give.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The onset is kept for every buff, since one fixing its value as it begins shows no value.",
    },
  ],
  createdAt: "2026-10-21T04:05:39.502Z",
  updatedAt: "2026-10-21T04:05:39.502Z",
} as const satisfies Module
