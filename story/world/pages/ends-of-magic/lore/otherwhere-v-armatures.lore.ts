import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVArmatures = {
  id: "01a0e9f7-1def-73d5-acd3-18b529924156",
  type: "page-type/lore",
  slug: "otherwhere-v-armatures",
  title: "Armatures",
  world: "world/ends-of-magic",
  about: "world-item/otherwhere-v-armatures",
  facts: [
    {
      fact: "Armatures are enchanted flying armor made and flown chiefly in Esebus.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An armature's magical wings extend ten feet on each side.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An armature leaves the torso mostly bare and defends its wearer with magical shields.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Military armatures carry weapon pods on each wrist.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Guardians of Esebus patrol the whole continent in winged armatures.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rich Esebus citizens fly their own armatures about the city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Esebus has about six armature manufactories, worked partly by insolvent laborers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Elite Esebus armor can tear through stone walls, leap buildings, and has an adamant layer.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Esebus armor links guards in a network of Message spells.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
