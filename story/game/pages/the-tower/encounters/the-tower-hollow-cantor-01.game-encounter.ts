import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerHollowCantor01 = {
  id: "01a0c664-938f-7234-815a-0899cfa9ead8",
  type: "page-type/game-encounter",
  slug: "the-tower-hollow-cantor-01",
  title: "Hollow Cantor",
  game: "game/the-tower",
  location: "place/the-tower-floor-03",
  characters: ["character-other/the-tower-hollow-cantor-01"],
  readableTrait:
    "A wraith of folded sound — it attacks the MIND (mode: ment), pouring a song that claws at Focus and will. This is the FIRST real test of Alan's mentDef (33, his high stat — good) but the Cantor is built to threaten it: high WILL/INT/PRES, baseDamage 14, intent 6. GATE: its power is entirely BORROWED from the bronze resonance-plates — it sings THROUGH them. Coordinator: the Cantor's effective attack scales with how many plates still stand. All plates up = full power (the math above, ~25–31 to Focus per hit — dangerous over a long fight). Each plate shattered/toppled cuts its reach; in the DEAD ALCOVE or its acoustic shadow its ment attack is HALVED or fails outright. Strike the bronze, not the wraith — a body-blow to the Cantor itself barely matters (it is half-air; x0.4 to direct physical hits), but killing its amplifiers strips it to a whisper. The silver whistle staggers it (rings every plate at once). A reader who attacks the ACOUSTICS — topples plates, fights from the alcove, uses the whistle — earns intent 8+ and wins safely. A reader who tries to trade blows with the wraith body bleeds Focus and loses. NOTE: it cannot deal lethal HP damage directly — it empties Focus (104); at 0 Focus Alan is dazed/staggered (coordinator: reads fail, intent capped low, vulnerable) — the danger is being mind-emptied right as the Golem wakes.",
  trigger: "advancing into the nave past the first pair of plates",
  experience: 160,
  drop: "a tuning-shard of folded sound (sound/affinity seed) and +1 toward a 'Resonance Reading' skill — the System notes he learned to read a space by its echoes",
  gates: [
    {
      name: "struck in the body",
      multiplier: 0.4,
      note: "The wraith is half air, so a physical blow to it barely matters. Strike the bronze, not the wraith.",
    },
    {
      name: "singing from the acoustic shadow",
      multiplier: 0.5,
      note: "Its power is borrowed from the bronze plates. In the dead alcove, or with the plates down, its song on the mind is halved or fails.",
    },
  ],
} as const satisfies GameEncounter
