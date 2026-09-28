import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVNuclearMagic = {
  id: "01a0ea01-3007-731a-9ec8-f41f5fa50564",
  type: "page-type/lore",
  slug: "otherwhere-v-nuclear-magic",
  title: "Nuclear Magic",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-nuclear-magic",
  facts: [
    {
      fact: "A grand Insight, such as a city-breaking spell, can be a nation's trump card.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Radiation is only barely magical, so it mostly passes through antimagic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The mage Dalo of Gemore casts a spell that compresses and heats air to terrible effect.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dalo nearly killed himself learning that spell, and does not understand why it works.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dalo insists that anyone who saw his spell be healed afterwards.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
