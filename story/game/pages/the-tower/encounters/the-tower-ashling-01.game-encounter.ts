import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerAshling01 = {
  id: "01a0c664-93e6-7228-8724-cdd5b9871fa6",
  type: "page-type/game-encounter",
  slug: "the-tower-ashling-01",
  title: "Ashling",
  game: "game/the-tower",
  location: "game-location/the-tower-floor-01",
  characters: ["character-other/the-tower-ashling-01"],
  readableTrait:
    "A knot of living ember in the shape of a hunched animal. Its body is loose ash held together around a single bright CORE pulsing at the chest — the only solid thing in it. Strikes that scatter the ash do little; the core is the kill. A reader who targets the core (PERCEPTION/INTELLECT play) earns a high intent score. Water/smothering the core = instant high-intent finish if available.",
  trigger: "first movement past the iron door",
  experience: 60,
  drop: "a warm fist-sized cinder (the cooled core) — first crafting/affinity seed",
} as const satisfies GameEncounter
