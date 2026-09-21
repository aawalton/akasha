import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const partnersIiAmy = {
  id: "01a0c663-1f88-71a3-a733-96a9ee1d4544",
  type: "page-type/game-entity",
  slug: "partners-ii-amy",
  title: "Amy",
  game: "game/partners-ii",
  kind: "partner",
  level: 1,
  skills: [
    { name: "Stewardship", progress: 0, effect: "none stated" },
    { name: "Reading People", progress: 0, effect: "none stated" },
    { name: "Provisioning", progress: 0, effect: "none stated" },
    { name: "Letters & Accounts", progress: 0, effect: "none stated" },
  ],
  revealGate: 9999,
  note: "First sister — UNMET, intro order 1. Intro hook: the keys leave her locked drawer at dusk the moment he crosses; she climbs the hill the same evening with supper packed before she knows whom she'll meet (Kept's first-ever firing — her hands sure of a stranger; she will not know what it means). Voice her ONLY via the fresh amy seat from her first line onward (gmContext policy amy-seat-voice). GM-EYES: Kept fate-basis is deep fog.",
} as const satisfies GameEntity
