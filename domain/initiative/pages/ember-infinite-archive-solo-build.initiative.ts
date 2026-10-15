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
        "Matching the game out of combat: armor 27,370 with the Lover and 32,382 with the Lady, penetration 11,050, max health 31,895. Healing per second, overheal counted, is 8,488 by `akasha temper hps` against 8,905 in a 21 second fight. The model has skills, Fire Keeper in its area, the weapon enchant, Reaving Blows and critical heals; it lacks The Storm Voice, which needs an Ultimate model, and Power Lash, which needs Off Balance.",
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
  updatedAt: "2026-10-15T14:25:16.068Z",
} as const satisfies Initiative
