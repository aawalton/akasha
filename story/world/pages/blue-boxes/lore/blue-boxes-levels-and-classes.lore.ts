import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const blueBoxesLevelsAndClasses = {
  id: "01a14b12-6d3f-78c8-8507-624afed20f5d",
  type: "page-type/lore",
  slug: "blue-boxes-levels-and-classes",
  title: "Levels and Classes",
  world: "world/blue-boxes",
  about: "world/blue-boxes",
  facts: [
    {
      fact: "The System counts experience from quests done, fights won and work done well.",
      knowers: ["lore-disclosure/game-master", "character-other/blue-boxes-iris"],
    },
    {
      fact: "The System offers a class once a person's deeds lean one way; it can be taken or refused.",
      knowers: ["lore-disclosure/game-master", "character-other/blue-boxes-iris"],
    },
    {
      fact: "Most people take a class in their teens; a grown woman with none is rare and stared at.",
      knowers: ["lore-disclosure/game-master", "character-other/blue-boxes-iris"],
    },
    {
      fact: "The guild hall registers adventurers and posts quests, and registering costs a silver piece.",
      knowers: ["lore-disclosure/game-master", "character-other/blue-boxes-iris"],
    },
  ],
  createdAt: "2026-10-17T18:14:21.246Z",
  updatedAt: "2026-10-17T18:14:21.246Z",
} as const satisfies Lore
