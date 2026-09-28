import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereStorage = {
  id: "01a0e9d3-bf30-760b-881b-d0b060b28521",
  type: "page-type/lore",
  slug: "otherwhere-storage",
  title: "Storage and Inventory",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Dimensional storage comes as packs, pouches, straps, harness bags and runes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A belt pouch holds a few pounds, and a common magic bag about fifty.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Storage straps shrink whatever touches them to toy size until removed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harness bags let handless beasts stow armor and gear.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some storage takes only one kind of thing, such as a bag that holds only drink.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Living creatures cannot be stored, though inert constructs and corpses can.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Anything bound to an item counts as part of its owner's inventory.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Inventory travels with its owner through dungeon exits and portals.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The profile's inventory list later shows only items of uncommon grade and above.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Most storage preserves food for long periods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Losing a bag means losing everything inside it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
