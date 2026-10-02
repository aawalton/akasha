import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereITheDeserterCrew2 = {
  id: "01a0fd57-fd50-7501-ad13-816c4889cbe9",
  type: "page-type/lore",
  slug: "overwhere-i-the-deserter-crew-2",
  title: "Harl Voss's Crew, continued",
  world: "world/hell-hound-evolution-litrpg",
  about: "lore/overwhere-i-the-deserter-crew",
  facts: [
    {
      fact: "The burned crew Drakewolf runs on past the pit into the forest and does not come back today.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In the pit Voss rallies the rest behind stone, crossbows on the lip, and waits.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nala's slugs struck both crossbowmen and two burned blademen as they ran; all kept moving.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-i-nala"],
    },
    {
      fact: "A bolt from someone unseen in the trees struck Nala's shoulder; she turned the next.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-i-nala"],
    },
  ],
} as const satisfies Lore
