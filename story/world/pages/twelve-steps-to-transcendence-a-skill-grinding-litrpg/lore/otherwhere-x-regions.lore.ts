import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXRegions = {
  id: "01a0ea73-310e-747a-b8ee-922d60fc61ab",
  type: "page-type/lore",
  slug: "otherwhere-x-regions",
  title: "Regions of the World",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-regions",
  facts: [
    {
      fact: "The world is split into Regions, each bordered by regional walls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Central Plains is a Region of several kingdoms, Sulon among them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Central Plains has its own military.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Western Plains is a Region of forests and streams beyond a wall from the Central Plains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In the Western Plains kingdom, the elders' favor decides a noble House's standing.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "House Vane's grand estates and House Sterling's trading hub lie in the Western Plains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Worldcarver's River runs from its source near the Wall all the way to the Sea.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Haven Academy lies near the ocean at the river's end.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Everyone in the Western Plains knows the expeditions; Central Plains folk may not.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Noble children fly in from across a whole region to join an expedition.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Going from one Region to another takes great strength or strong connections.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Remote villagers often know little beyond their own Region and its walls.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
