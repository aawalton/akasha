import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiForestwindAcademy = {
  id: "01a0ed2f-54b5-7aaf-89a4-5c730bc10653",
  type: "page-type/place",
  slug: "overwhere-iii-forestwind-academy",
  title: "Forestwind Mage Academy",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-abylport",
      way: "The one forest path out, then along the coast to Abylport.",
    },
  ],
  facts: [
    {
      fact: "Forestwind Mage Academy is a hidden village of mage schooling in forested hills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It lies about an hour's flight along the coast from Abylport; one forest path leads out.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is more than two weeks' walk from Cyene.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Marble houses with gardens lodge two to four students or teachers each.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Streets of gray and yellow brick are lit by street lights and lanterns.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its grand central hall has stained glass of mages fighting monsters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A wind mana node lies in a central room with a stone pedestal and constant wind.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its students are rich or of noble descent; nobles there look down on non-mages.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Teachers hand students costly trinkets that cast spells, rather than teaching them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It favors the Path of Mystic Prism and scorns Lost Magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Headmaster Horace is an old, powerful mage who flies fast and teleports.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "About two dozen night guards work in three four-hour shifts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Servants lodge in a plainer house apart from the marble ones.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Horace hunts a 'monstrous bird' that broke into the node room this winter.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
