import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxHealingPotion = {
  id: "01a0ea3f-fe98-7aaa-a261-fe6c529c758b",
  type: "page-type/lore",
  slug: "otherwhere-ix-healing-potion",
  title: "Healing Potion",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-item/otherwhere-ix-healing-potion",
  facts: [
    {
      fact: "Healing potions come in small red vials, also called health potions or healing draughts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A healing potion tastes like an energy drink with a kick; some taste of cherry.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A strong healing potion quickly restores movement to a badly hurt arm.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Those without healing magic, such as the demon Drathok, rely on healing potions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arena fighters are given healing potions before bouts and ask for them as rewards.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Explosive vials are brewed as well as healing ones.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
