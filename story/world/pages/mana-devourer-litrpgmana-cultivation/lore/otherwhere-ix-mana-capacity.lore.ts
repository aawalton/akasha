import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxManaCapacity = {
  id: "01a0ea36-0397-7f52-ab73-344ceb87d75f",
  type: "page-type/lore",
  slug: "otherwhere-ix-mana-capacity",
  title: "Mana Capacity and Generation",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-mechanic/otherwhere-ix-mana-capacity",
  facts: [
    {
      fact: "Every being has a mana capacity: the most mana its body holds, counted as 100%.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Most beings cannot hold mana past 100% of capacity; the excess will not stay.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A status screen shows mana as current over maximum, and current may read above the maximum.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The system can also give mana as a percent of capacity, and break it down by grade and kind.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A breakdown lists each kind by grade, as '[D Grade Blood Mana: 30%]' or '[A Grade Divine Mana: 9%]'",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Spirit raises both mana capacity and mana generation.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Capacity climbs with Spirit, and more steeply the higher Spirit already is.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Constitution grants a minor increase to mana capacity for every five points.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At 100 Spirit comes a milestone: '[Spirit milestone reached: Mana Capacity increased by 50%.]'",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Absorbing a beast core raises capacity: a D Grade core gave 40 mana, a C Grade core 150.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Raising Spirit lifts capacity at once, but the new room still fills only as mana is made.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A body makes mana by the hour, at the grade that fits its overall level.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Box: '[Body is now generating 30 (F Grade) Spirit Mana and 15 (G Grade) Frost Mana per hour.'",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cores affixed to the body add generation of their own kind, as Frost from an ice beast's core.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A few hours of sleep can refill nearly a whole mana pool.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mana Control can raise one kind's generation by up to 100% at the cost of up to 100% of another's.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mana Control can be cast while meditating.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mana Toxicosis cuts natural mana generation by 66%.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mana Poisoning V stops a body generating mana at all, for a time.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A weapon with a core has its own capacity and generation, and stops generating when full.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Low mana is not always safe: a body that regenerates very fast can overflow on its own.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
