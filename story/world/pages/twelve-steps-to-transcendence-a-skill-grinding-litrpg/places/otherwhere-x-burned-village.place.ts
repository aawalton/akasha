import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXBurnedVillage = {
  id: "01a0ea7d-0ec1-7c5f-8d74-659739cbd6b5",
  type: "page-type/place",
  slug: "otherwhere-x-burned-village",
  title: "Benjamin's Burned Village",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  within: "place/otherwhere-x-sulon",
  facts: [
    {
      fact: "The burned village lies at Sulon's remote edge, near a regional wall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It was a small frontier village of dozens of wooden houses, with a beekeeper and hunters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its folk were mostly Tier 0, refused outside help, and liked to be left alone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its hunter families were strong, maybe Tier 1 or higher, and guarded their secrets.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The village burned to the ground; everyone died but one boy, Benjamin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Nothing is left of it now but ashes; nobody lives there.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Only a handful of villages lie nearby; the nearest real city is miles away.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sulon soldiers came after huge mana spikes here but found no rift or red zone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A forest path leads on foot from the ashes to Sulon's border camp.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
