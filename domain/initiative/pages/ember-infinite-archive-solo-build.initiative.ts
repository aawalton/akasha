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
        "Matching the game out of combat: armor 27,370 with the Lover and 32,382 with the Lady, penetration 11,050, max health 31,895. Healing per second, overheal and full shields counted, is 9,298 by `akasha temper hps` against 6,737 in a 94 second fight. The model builds Ultimate from none at 3 a second, matching the fight's 281 in 94 seconds, and casts The Storm Voice once in 60 seconds; it lacks Power Lash, which needs Off Balance, and Brawler's growth per enemy hit.",
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
  updatedAt: "2026-10-15T15:01:58.125Z",
} as const satisfies Initiative
