import type { GameLocation } from "akasha/story/game/location/game-location.page-type.types.ts"

export const theTowerTheDeepDen = {
  id: "01a0c661-2432-7f5d-a784-91358551c2db",
  type: "page-type/game-location",
  slug: "the-tower-the-deep-den",
  title: "The Deep Den",
  game: "game/the-tower",
  within: "game-location/the-tower-floor-05",
  depth: 5,
  description:
    "The gold thins. This room is colder, the welcome threadbare — the illusion working harder over something it can barely cover. There are figures here too, and now they throw shadows AND reflections, and the air is warm where they stand. Every single tell you climbed to is being faked at once. Under the fraying gold you catch the real room beneath: bare wet stone, a midden of what the haven has eaten — packs, boots, bones, a long time's worth of climbers who sat down to rest.",
  exits: ["back to the Long Gallery; forward / down-slope to the Host's Seat"],
  conditions: [
    {
      name: "light",
      note: "Threadbare gold over real cold dark. Here the false light is failing — patches of the real dim den show through. His Ember is both verification AND, increasingly, the only real light, easing back toward the floor-4 dynamic as the haven thins.",
    },
    {
      name: "water",
      note: "ONE honest drink — the scavenged flask in the midden (real water, hidden under the illusion; one use). Everywhere else the offered water is lure. Pre-decided: the only true water on the floor is the reward for reaching the cold truth.",
    },
  ],
  things: [
    {
      name: "the figures here (shadowed, reflected, warm — every tell faked)",
      use: "TIER-4: NO single tell works anymore. The den fakes shadow, heat, AND reflection. This is a DEDUCTION, not a spot-check.",
      note: "the ladder's top rung before the boss: the floor has defeated each individual tell, so the complexity becomes triangulation. This is the new-axis payoff — reading is now genuinely hard, not a one-line weakness.",
    },
    {
      name: "the midden of prior climbers (under the fraying gold)",
      use: "the stakes, and a real-supply cache. Among the eaten: usable scavenge — a flask of REAL water (the only honest water on the floor, here, hidden under the lie — one drink), a spare iron spike (atk 3 offhand), and a half-burned journal.",
      note: "the honest cache under the illusion: a reader who pushed through the comfort to the cold truth is rewarded (one real drink + the phase-3 warning). Counterpart to the lures of the warm rooms — truth is colder and barer but real.",
      status: "INTACT",
    },
    {
      name: "the bare wet stone beneath the gold (the real den)",
      use: "the floor's truth bleeding through — the den is a cold stone predation-chamber the haven is painted over. Reading the real stone (where the dust lies undisturbed, where the cold comes from) navigates truer than the warm illusion.",
      note: "the real layer. Decided: the stone is real; the gold is the lie; phase-3 strips the gold and the hidden edges/drop become live hazards.",
    },
    {
      name: "a half-burned journal",
      use: "a half-burned journal whose last legible line: 'IT WEARS THE ROOM. WHEN YOU KILL THE HOST THE WHOLE PLACE DIES AT ONCE — AND THE FLOOR GOES WITH IT. BE NEAR THE STAIR WHEN IT DOES.' Foreshadows phase-3 (the collapse) and hands him the real water as fair reward for reaching the bleak-through.",
      status: "INTACT",
    },
  ],
} as const satisfies GameLocation
