import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvDhoggurum = {
  id: "01a0ed28-7bc6-7d7e-8d00-6a32c62f6ed4",
  type: "page-type/place",
  slug: "overwhere-iv-dhoggurum",
  title: "Dhoggurum",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Dhoggurum is the capital of the Dwarven Empire, mostly a vast underground complex.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its halls are carved deep into the rock, with forges, mines and markets below ground.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An old enchantment spreads a net over the city that senses any teleport inside it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dwarven smiths of Dhoggurum are the finest metalworkers of the known world.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Silver slimes are kept by the dwarves, who farm slimes as humans do.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kobold hordes attack the dwarven tunnels in reckless waves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mining golems bought from Keld now labor in dwarven mines.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The elven embassy in Dhoggurum was destroyed by an explosion.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Since the blast, relations between dwarves and elves are strained and wary.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Envoys of the Outeatus Kingdom court favor in Dhoggurum.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A demon once rampaged in Dhoggurum before escaping.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "News from Dhoggurum is costly: brokers in Kaerlin ask a ludicrous sum for it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
