import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerDrownedSentry01 = {
  id: "01a0c664-9331-71f4-9893-039e00825a1f",
  type: "page-type/game-encounter",
  slug: "the-tower-drowned-sentry-01",
  title: "Drowned Sentry",
  game: "game/the-tower",
  location: "game-location/the-tower-floor-02",
  characters: ["character-other/the-tower-drowned-sentry-01"],
  readableTrait:
    "An armored corpse-thing, centuries waterlogged, its rusted plate fused at every joint. GATE: the fused armor makes it brutally slow — it cannot pivot or turn in time. Strikes to its front are largely turned by the plate (coordinator applies x0.4 damage to any frontal blow); a blow taken to its BACK or an unarmored joint behind the knee/neck lands clean (x1.5). A reader who maneuvers behind it (leg-driven footwork, the walkway geometry, baiting its slow turn) earns intent 7+. Second gate: it is DRY ROT under the rust — HEAT is its bane. Set it alight — with the brazier, OR with Ember Channel heat projected through the iron bar (the skill Alan manifested on floor 1; a Focus-cost invoke, no brazier required) — and the seized joints crack; a burning Sentry takes x2 from the next blow and loses its turn flailing. Cold water does nothing (it is already drowned). The wrong read — trying to drown it, or trading blows to its face — wastes the fight.",
  trigger: "stepping onto the submerged platform, or attacking from the walkway",
  experience: 110,
  drop: "a still-warm rivet of fire-purged iron (heat-affinity seed) and the Sentry's intact pauldron (armor def 2, wearable — Alan's first armor)",
  gates: [
    {
      name: "struck at the front",
      multiplier: 0.4,
      note: "The fused plate turns most of a frontal blow.",
    },
    {
      name: "struck behind",
      multiplier: 1.5,
      note: "Its back, or an unarmored joint behind the knee or neck, takes a blow clean.",
    },
    {
      name: "set alight",
      multiplier: 2,
      note: "It is dry rot under the rust. Burning, its seized joints crack and it loses the turn flailing. Cold water does nothing.",
    },
  ],
} as const satisfies GameEncounter
