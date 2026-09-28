import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXGoblinPoison = {
  id: "01a0ea74-a2ce-7397-9471-3448761ae95e",
  type: "page-type/lore",
  slug: "otherwhere-x-goblin-poison",
  title: "Goblin Poison",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-goblin-poison",
  facts: [
    {
      fact: "Goblin arrow poison is common; goblins tip their stone arrows with it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The poison numbs the wound and spreads purple veins from it toward the heart.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Caught early, a healer can flush goblin poison out in about five minutes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Left untreated for a day, the poison roots itself around the wound.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rooted goblin poison can only be removed by cutting off and regenerating the limb.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A healer can halt the poison's spread even when it cannot be removed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rooted poison may fade slowly, may flare up and need healing, or may worsen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A poisoned limb can go numb and useless.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lingering goblin poison brings bouts of dizziness.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "As the veins creep up the neck, the victim's vision darkens.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
