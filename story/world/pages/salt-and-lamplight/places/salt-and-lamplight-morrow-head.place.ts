import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const saltAndLamplightMorrowHead = {
  id: "01a0fd0b-91b7-785c-88b7-791305a98a06",
  type: "page-type/place",
  slug: "salt-and-lamplight-morrow-head",
  title: "Morrow Head Light",
  world: "world/salt-and-lamplight",
  within: "place/salt-and-lamplight-penmorrow",
  facts: [
    {
      fact: "Morrow Head is a rocky point a mile north of Penmorrow, and its light warns boats off the Teeth.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "The Teeth are a reef of black rocks off Morrow Head that have drowned boats for three hundred years.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "The lighthouse is a white stone tower with a red iron lantern cap, ninety-six steps to the lamp.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "The lamp burns oil behind a great glass lens, turned by a clockwork wound every four hours.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "The lamp is lit at dusk and put out at dawn, and its wick is trimmed and its lens polished daily.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "The keeper's cottage of granite and slate sits at the tower's foot, with one hearth and one bed.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "A narrow loft over the cottage kitchen holds sail canvas, spare blankets and a straw mattress.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "A walled kitchen garden and a goat shed sit in the lee of the cottage.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "Steep steps hewn into the rock lead down from the point to a small shingle cove.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
    {
      fact: "The tide leaves in the shingle cove below Morrow Head whatever the sea gives up.",
      knowers: ["lore-disclosure/game-master", "character-other/salt-and-lamplight-morwenna"],
    },
  ],
} as const satisfies Place
