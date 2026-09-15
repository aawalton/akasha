import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberWerewolfParse = {
  id: "01a090d2-f75d-7a2d-98e2-136f0cae87ed",
  type: "page-type/initiative",
  slug: "ember-werewolf-parse",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [
    {
      statement: "Three-Color Stalker parses 135,000 or more on the trials dummy.",
      workingMemory:
        "The Update 50 figure on the 21 million Iron Atronach is 176.7k for this setup on Nightblade. It comes from a simulator assuming every light attack lands and bash weaving, so a real parse falls short. Food is Braised Rabbit with Spring Vegetables. The potion is Essence of Weapon Power from Blessed Thistle, Dragonthorn and Water Hyacinth: the kit carries Major Brutality, Sorcery, Berserk, Courage and Minor Force already, and Major Savagery is the one damage buff left for a potion.\n",
    },
    {
      statement: "An inventory capture reaches akasha again.",
      workingMemory:
        "The newest inventory snapshot page is at-2026-08-29-20-59-15, and no capture has landed in the seventeen days since, so nothing in akasha shows what a character wears now. Why captures stopped is not yet found. Equipment reaches akasha only through these snapshots: there is no per-character equipment page type, and worn items are the bag 0 rows of a snapshot's stacks file.",
    },
  ],
  constraints: [
    "Update 50 is live, and Update 51 lands on 28 September 2026 repricing every werewolf ability, so this build shifts under the work.",
    "Werewolf form carries only the six werewolf abilities, so Moon Hunter Keep is run in human form, where Precognition answers Mylenne Moon-Caller's pounce.",
    "Savage Werewolf binds on pickup and drops only in Moon Hunter Keep, which is Wolfhunter content.",
    "CombatMetrics and TemperCombat both hook combat events, so one is off before a parse is trusted.",
  ],
} as const satisfies Initiative
