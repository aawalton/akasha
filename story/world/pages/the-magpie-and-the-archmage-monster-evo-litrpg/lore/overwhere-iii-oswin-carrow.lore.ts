import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiOswinCarrow = {
  id: "01a0ed30-5d26-7d4f-9772-e73848b8d04e",
  type: "page-type/lore",
  slug: "overwhere-iii-oswin-carrow",
  title: "Oswin Carrow",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-oswin-carrow",
  facts: [
    {
      fact: "Oswin Carrow is Merrowgate's reeve, a wool merchant of about forty-five, chosen by the guilds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is thin, balding, ink-stained and tired, with a good coat worn shiny at the elbows.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is careful with coin and afraid of the Iron Law inspector, but he is decent.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is a widower raising one daughter, Pip, who runs rings round him.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He pays the blight bounty out of the town chest and fears it will run dry by spring.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He wants the blight gone before the inspector comes and calls it a failure of his.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
