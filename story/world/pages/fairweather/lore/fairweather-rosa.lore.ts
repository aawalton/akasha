import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const fairweatherRosa = {
  id: "01a1070e-4e86-7e37-b59d-89bdce89bd5b",
  type: "page-type/lore",
  slug: "fairweather-rosa",
  title: "Rosa",
  world: "world/fairweather",
  about: "character-other/fairweather-rosa",
  facts: [
    {
      fact: "Rosa Reyes is in her fifties, broad and weathered, with laughing green eyes and greying curls.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-rosa"],
    },
    {
      fact: "Rosa wears a faded red shirt, a coal-dusted canvas apron, brown trousers and a grey knitted shawl.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-rosa"],
    },
    {
      fact: "Rosa is loud and warm and laughs like Tamsin, and has kept Tamsin's bunk made up all year.",
      knowers: ["lore-disclosure/game-master", "character-other/fairweather-rosa"],
    },
  ],
} as const satisfies Lore
