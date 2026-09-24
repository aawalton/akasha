import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerLeechGlut01 = {
  id: "01a0c664-9374-7bb7-9580-15ba3c5471a7",
  type: "page-type/game-encounter",
  slug: "the-tower-leech-glut-01",
  title: "The Glut",
  game: "game/the-tower",
  location: "game-location/the-tower-floor-02",
  characters: ["character-other/the-tower-leech-glut-01"],
  readableTrait:
    "Not one creature — a swarm of leech-things acting as one pooled mass, fast and near-impossible to hit cleanly in the water (high FINESSE, high Initiative 26; coordinator applies x0.3 to any blow struck while it is IN the flood — you can't cut water). GATE: the swarm is BOUND to the water. Drive it, or yourself, onto dry stone — the walkway, the platform — and the mass loses cohesion: out of water it is sluggish, halves its own attack, and takes full damage. Lure-and-strand is the kill. A reader who uses the dry footing, fire (it recoils from the brazier OR from an Ember-Channel-heated bar), or salt/ash to herd it out of the flood earns intent 8+. Brute-swinging at it in the water is a near-no-op. It will try to pull a target INTO the deep (drowning play vs VIT 6 — a genuine lethal threat if Alan is grappled under).",
  trigger: "entering the deep water, submerging, or warmth/blood entering the flood",
  experience: 90,
  drop: "a sac of swarm-ichor (alchemy/affinity seed) — sticky, mildly caustic, throwable",
  gates: [
    {
      name: "struck in the flood",
      multiplier: 0.3,
      note: "The mass pools and re-forms in water, so a blow struck while it is in the flood cuts water.",
    },
    {
      name: "stranded on dry stone",
      multiplier: 1,
      note: "Out of the water the mass loses cohesion, halves its own attack and takes a blow whole. Lure and strand is the kill.",
    },
  ],
} as const satisfies GameEncounter
