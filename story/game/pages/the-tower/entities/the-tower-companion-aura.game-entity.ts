import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerCompanionAura = {
  id: "01a0c65d-2123-76d9-b41a-c99a9ae8a6d6",
  type: "page-type/game-entity",
  slug: "the-tower-companion-aura",
  title: "Aura",
  game: "game/the-tower",
  kind: "ally",
  class:
    "Wildcard (tentative) — a versatile skirmisher/improviser; no fixed lane, leans into whatever the moment rewards",
  level: 1,
  attributes: [
    { attribute: "game-attribute/finesse", score: 15 },
    { attribute: "game-attribute/intellect", score: 13 },
    { attribute: "game-attribute/luck", score: 15 },
    { attribute: "game-attribute/might", score: 11 },
    { attribute: "game-attribute/perception", score: 14 },
    { attribute: "game-attribute/presence", score: 16 },
    { attribute: "game-attribute/vitality", score: 12 },
    { attribute: "game-attribute/will", score: 12 },
  ],
  traits: [
    {
      name: "Momentum",
      effect:
        "Aura builds on a fight's energy — after a teammate's hit or a clever play, her next action earns an intent bonus. She rewards a party that combos; she's strongest when the team is rolling.",
    },
    {
      name: "Roaring Charisma",
      effect:
        "PRESENCE 16 — she can rally, taunt, distract, or lift the party's footing. Social/morale actions and pulling enemy attention are her strong plays (complements Alan's State-Gated Presence — she carries the room when his sags).",
    },
    {
      name: "Lucky",
      effect:
        "LUCK 15 — fortune tilts her way more often than not. Coordinator may grant her a once-per-encounter favorable re-read or fortunate break.",
    },
    {
      name: "First Off the Mark",
      effect:
        "Initiative 29 (PER 14 + FIN 15) — usually acts first in the party. Good at setting up Alan's reads (scout the opening, then he names the weakness).",
    },
  ],
  dice: "game-mechanic/two-d-ten",
  unspentAttributePoints: 0,
  note: "Tentative. Aura's draw is adaptability and momentum, not specialization — she covers gaps and turns a fight's energy. Calibrate the class against the real persona.",
} as const satisfies GameEntity
