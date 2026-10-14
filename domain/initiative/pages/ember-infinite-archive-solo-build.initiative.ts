import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberInfiniteArchiveSoloBuild = {
  id: "01a13aaf-dce3-74f0-9153-b091cba32189",
  type: "page-type/initiative",
  slug: "ember-infinite-archive-solo-build",
  domain: "domain/temper-player",
  persona: "persona/ember",
  intentStack: [
    {
      statement: "Temper's estimate of Erin's stats matches what the game reported.",
      workingMemory:
        "The game merged spell and weapon power and critical buffs; Savagery and Brutality survive. Owed: retire Major and Minor Prophecy and Sorcery and every page naming them, and clean up the debuffs the game merged the same way.",
    },
    {
      statement: "Erin's armor, penetration, max health and healing per second are known.",
    },
  ],
  constraints: [
    "Alan approves each intent and each constraint before it is added.",
    "The build is for Erin Solstice, a Dragonknight.",
    "The build is judged by the Infinite Archive leaderboard score, which rises with how deep Erin gets.",
    "How deep Erin gets rests mainly on how well Erin survives.",
    "Erin's total armor reaches 33,000.",
    "Erin's total penetration reaches 9,100.",
    "Erin's effective health is a high priority, made of max health, defensive buffs and healing per second.",
    "Every damage skill on Erin's bars also keeps Erin alive.",
  ],
  createdAt: "2026-10-14T13:52:46.306Z",
  updatedAt: "2026-10-14T14:28:31.003Z",
} as const satisfies Initiative
