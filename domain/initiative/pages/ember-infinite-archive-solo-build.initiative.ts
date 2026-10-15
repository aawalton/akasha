import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberInfiniteArchiveSoloBuild = {
  id: "01a13aaf-dce3-74f0-9153-b091cba32189",
  type: "page-type/initiative",
  slug: "ember-infinite-archive-solo-build",
  domain: "domain/temper-player",
  persona: "persona/ember",
  intentStack: [
    {
      statement: "Erin's armor, penetration, max health and healing per second are known.",
      workingMemory:
        "Matching the game out of combat: armor 27,370 with the Lover and 32,382 with the Lady, penetration 11,050, max health 31,895. `akasha temper tps` says toughness per second, the mean over one-second ticks of the hit that would kill: max health, shields up and healing landing, over the damage that lands. It is 131,751 estimated against 118,668 in a 55 tick fight, whose shields count what was left. The model lacks Power Lash, which needs Off Balance, and Brawler's growth per enemy hit.",
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
  updatedAt: "2026-10-15T15:28:57.834Z",
} as const satisfies Initiative
