import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiVouchersAndTokens = {
  id: "01a0e9d3-bf30-787a-b13d-dbf7b45ba7a0",
  type: "page-type/lore",
  slug: "otherwhere-ii-vouchers-and-tokens",
  title: "Vouchers and Tokens",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "A consumable voucher is redeemed from the menu for one package from a list.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A gear voucher lets its holder pick a piece of equipment from a list.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An item-crafting voucher turns a safe room door into an entrance to a craft world.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The crafting voucher pays for the most expensive item its holder commissions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Building vouchers come in Basic, Common, Uncommon, Rare and Unique grades.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Common and Uncommon building vouchers make non-magical buildings of rising quality.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rare and Unique buildings mostly need mana from claimed resources.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Unique buildings exist once per world and usually need a tier-7 city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Vouchers cannot buy things that are not structures.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A quest reward token can raise an existing item's rarity.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An Ability-Upgrade Token grants all three upgrade options when an ability reaches rank 2.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Trait-Enhancement Token strengthens a bloodline trait and may add a second effect.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Traits not issued by the System cannot be enhanced with tokens.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Patrons and gods may buy advancement boosters for a contestant.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A key from a bloodline library unlocks one high-quality bloodline trait.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
