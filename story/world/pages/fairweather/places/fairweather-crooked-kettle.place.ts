import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const fairweatherCrookedKettle = {
  id: "01a1047b-913a-7001-9580-5671e7b1311d",
  type: "page-type/place",
  slug: "fairweather-crooked-kettle",
  title: "The Crooked Kettle",
  world: "world/fairweather",
  within: "place/fairweather-lanternmere",
  facts: [
    {
      fact: "The Crooked Kettle is a narrow tea house of four tables, its kettle sign hung askew over the door.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
        "character-player/fairweather-elsie",
        "character-other/fairweather-cora",
      ],
    },
    {
      fact: "The Crooked Kettle is kept by a tiny, sharp-eyed widow in her seventies who brews every pot herself.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
        "character-other/fairweather-cora",
      ],
    },
    {
      fact: "The Crooked Kettle is proud of its strong black house tea, brewed dark enough to stand a spoon in.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
        "character-other/fairweather-cora",
      ],
    },
    {
      fact: "A hatch behind the counter opens on a low cellar stacked with tea chests.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-player/fairweather-elsie",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
      ],
    },
    {
      fact: "The cellar rats are ordinary brown rats, dozens of them, grown fat on spilled tea and sugar.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
      ],
    },
    {
      fact: "The rats have gnawed open three chests of the keeper's best black tea.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
        "character-other/fairweather-cora",
      ],
    },
    {
      fact: "The rats come in through a broken grate at the cellar's far end, where it meets an old culvert.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
      ],
    },
    {
      fact: "Rats driven out of the cellar come back through the grate within a day unless it is mended.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
      ],
    },
    {
      fact: "The guild pays a cellar quest once the keeper signs the notice as done.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-tamsin",
        "character-player/fairweather-elsie",
        "character-other/fairweather-tilly",
        "character-other/fairweather-cora",
      ],
    },
    {
      fact: "Elsie's party drove out the Crooked Kettle's rats and wired its broken grate shut.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/fairweather-elsie",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
      ],
    },
  ],
} as const satisfies Place
