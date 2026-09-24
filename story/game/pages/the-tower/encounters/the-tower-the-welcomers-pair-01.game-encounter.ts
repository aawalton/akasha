import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerTheWelcomersPair01 = {
  id: "01a0c664-9414-785a-bd33-65957a35c272",
  type: "page-type/game-encounter",
  slug: "the-tower-the-welcomers-pair-01",
  title: "The Welcomers (coordinated pair — run TWO instances of this sheet)",
  game: "game/the-tower",
  location: "game-location/the-tower-floor-05",
  entities: ["character-other/the-tower-the-welcomers-pair-01"],
  readableTrait:
    "TWO Welcomers (same sheet, run as two) working as a MULTI-THREAT pair — the genuine difficulty ramp over floor 4's lone predator. One FRONTS (holds attention with the cup/offer), one FLANKS (circles to his back 'to look at the wound') for the intimate kill; if he fixates on one, the other lands the trust-strike (~53-70). GATE: same as the lone Welcomer (presented ×0.25 / revealed true form ×1.8 / trust-opener lethal), but now the TIER-3 tell — the Ember heat-shadow is ALSO faked in the gallery, so the honest tool is the MIRRORS (woven figures throw no reflection). The read: keep his back to a mirror or wall (deny the flank — geometry beating his weak PER), catch each figure in the glass to tell real-from-projected, refuse both offers, and reveal/strike the true forms. Brute-trading in the open while flanked is a lethal slog; a reader controls the angles and uses the silver. Coordinator: the pair can be split (lure one past a mirror, isolate it) — reward that.",
  trigger: "entering the Long Gallery / engaging either of the two figures (they act together)",
  drop: "two false-face shards (a matched pair — a glamour-craft seed toward casting a borrowed face of his own) and a silvered gallery-shard (a true-reflection lens — a verification tool he can carry forward against illusion)",
  gates: [
    {
      name: "struck at the kind face it presents",
      multiplier: 0.25,
      note: "The kind climber's face is a woven image, so a blow lands on light.",
    },
    {
      name: "struck once the true cold form shows",
      multiplier: 1.8,
      note: "The heat-shadow is faked in the gallery too, so the honest tell is the mirrors: a woven figure throws no reflection.",
    },
  ],
} as const satisfies GameEncounter
