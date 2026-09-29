import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiNecromancy = {
  id: "01a0ea8b-ae81-782d-8da0-ee7c516c3722",
  type: "page-type/lore",
  slug: "otherwhere-xi-necromancy",
  title: "Necromancy",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-mechanic/otherwhere-xi-necromancy",
  facts: [
    {
      fact: "Necromancy is horribly taboo on Nyil, and a death sentence on Param.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A strong black caster could learn necromancy with ease; choosing not to is a choice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Enttiku's church punishes magic that violates her creed with maximum force.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "To Enttiku, breaking a necromancer's spell is not necromancy: intent is what matters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Commanding undead through a relay feels like being a spider in a web, knowing all.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A servant of death sees black threads over the undead; cutting them makes the undead crumble.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A general's leadership scream can command undead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dead dragons can be reanimated with runes on their bones; dragons call it a mockery of life.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A dragon golem can direct an undead horde as a relay of its master's will.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Inquisitors are rumoured to read the memories of the dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
