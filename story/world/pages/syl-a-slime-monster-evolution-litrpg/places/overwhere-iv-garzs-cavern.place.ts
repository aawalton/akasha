import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvGarzsCavern = {
  id: "01a0ed38-14be-7902-afbd-abba88551950",
  type: "page-type/place",
  slug: "overwhere-iv-garzs-cavern",
  title: "Garz's Cavern",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Garz's Cavern is a hidden goblin village in a great cavern under the mountain past Southbrook.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is reached through the empty tunnels behind the old scorched goblin cave.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A second way out opens aboveground on the far side of the mountain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Chieftain Garz, a scarred Greater Hobgoblin Warlord, rules the village.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The hobgoblin Torkz is Garz's bodyguard.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some tunnel goblins here bear a subterranean mutation that turns their skin ashen gray.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No goblin here holds a class above intermediate tier, and none trains apprentices.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Only the chief among these goblins holds the Identify skill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The villagers revere a Grand Shaman and share gloop from a pot that is never cleaned.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its best crafters, the Omnicrafter Yuzz and the chef Glooz among them, have left for good.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Garz's goblins have not raided Southbrook, though the town lies close.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
