import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberWerewolfParse = {
  id: "01a090d2-f75d-7a2d-98e2-136f0cae87ed",
  type: "page-type/initiative",
  slug: "ember-werewolf-parse",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [],
  constraints: [
    "Update 50 is live, and Update 51 lands on 28 September 2026 repricing every werewolf ability, so this build shifts under the work.",
    "Werewolf form carries only the six werewolf abilities, so Moon Hunter Keep is run in human form, where Precognition answers Mylenne Moon-Caller's pounce.",
    "Savage Werewolf binds on pickup and drops only in Moon Hunter Keep, which is Wolfhunter content.",
    "CombatMetrics and TemperCombat both hook combat events, so one is off before a parse is trusted.",
  ],
} as const satisfies Initiative
