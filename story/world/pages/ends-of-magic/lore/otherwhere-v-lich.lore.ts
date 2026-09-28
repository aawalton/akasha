import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVLich = {
  id: "01a0e9fb-c05e-76dc-bda7-5864850cb0b4",
  type: "page-type/lore",
  slug: "otherwhere-v-lich",
  title: "Lich",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-lich",
  facts: [
    {
      fact: "Liches are undead mages, first risen in the wake of the Ending of Undeath.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The Questors gave the undead mages the name "liches".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Syncarius was the first lich and the supposed inventor of death magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An adamantium dagger is said to have slain the first lich.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A lich is about as strong as a Gemore war mage.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Liches cast darts of death magic, slashes of force and stranger spells.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Liches are among the named dangers of undead blights.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
