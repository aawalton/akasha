import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theOnsetTheSystem = {
  id: "01a0ddf8-63fd-757b-a758-3b66e31afe44",
  type: "page-type/lore",
  slug: "the-onset-the-system",
  title: "The Onset & the System",
  world: "world/the-beholder",
  about: "world/the-beholder",
  facts: [
    {
      fact: "With the hum, a sense like a jeweler's loupe drops over Pearl's perception.",
      knowers: ["lore-disclosure/game-master", "character-player/the-beholder-pearl"],
    },
    {
      fact: "The loupe lets Pearl taste which of a victim's traits are finest.",
      knowers: ["lore-disclosure/game-master", "character-player/the-beholder-pearl"],
    },
    {
      fact: "On the kill comes a click.",
      knowers: ["lore-disclosure/game-master", "character-player/the-beholder-pearl"],
    },
    {
      fact: "After the click the System surfaces the victim's three most notable traits as a plain readout.",
      knowers: ["lore-disclosure/game-master", "character-player/the-beholder-pearl"],
    },
    {
      fact: "Pearl may take exactly one of the three traits.",
      knowers: ["lore-disclosure/game-master", "character-player/the-beholder-pearl"],
    },
    {
      fact: "The System states facts and reports values, nothing more.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "All the taste, delight and cruelty in an appraisal is Pearl's; the System's readout is bare.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "When Pearl fixes on a richly beautiful or notable person, her appetite, the hum, rises.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
