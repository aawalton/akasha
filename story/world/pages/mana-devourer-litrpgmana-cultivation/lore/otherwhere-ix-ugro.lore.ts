import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxUgro = {
  id: "01a0ea3d-08c0-7325-9730-08a762d81868",
  type: "page-type/lore",
  slug: "otherwhere-ix-ugro",
  title: "Ugro",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-character/otherwhere-ix-ugro",
  facts: [
    {
      fact: "Ugro is a troll who works the lower levels beneath the Sun City arena.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ugro works the mechanism of the cart ramp down the great stairs, and hauls the cart.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ugro's voice is deep and slow, and he speaks in broken phrases: Imp make joke!",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ugro sighs over the imps' bickering: Imps argue.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Ugro is at the ramp beneath the arena, hauling carts below.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
