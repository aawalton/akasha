import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiHalDunmore = {
  id: "01a0f169-ee39-75bb-ab82-087fb2ed6a06",
  type: "page-type/lore",
  slug: "overwhere-iii-hal-dunmore",
  title: "Hal Dunmore",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-hal-dunmore",
  facts: [
    {
      fact: "Hal Dunmore keeps Merrowgate's south gate from dusk to dawn, with a lantern and the gate book.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is about forty, lean and weathered, with a drooping brown mustache and a green town tabard.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "He is a Common, a Watchman of Level 14, and has known Tobin Wick for twenty years.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He writes each paperless traveler in the gate book: name, looks, business, and who vouches.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A stranger a townsman vouches for goes in; one with no voucher waits in the gatehouse till dawn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is tired, fair and dry, and tells any stranger short of work to try the Guild post.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The gate book goes to the reeve each morning, and the reeve reads every stranger's line.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The gate guard's aura is faint, a shade brighter than Tobin's candle.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
