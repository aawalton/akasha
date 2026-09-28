import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiSpeciesGrades = {
  id: "01a0e9da-48b1-7add-bf60-6d0a6d3d8d90",
  type: "page-type/lore",
  slug: "otherwhere-ii-species-grades",
  title: "Species Grades in Practice",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Grades run F, E, D, C, B and A, and AA and SS lie beyond.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A galaxy-spanning progenitor may reach grade AA.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Common insects start at grade F and can be bred up to grade E.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Grade D bodies never fall ill and heal overnight.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Integration rewinds the elderly to the body of a fifty-year-old.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Grade D adds about a hundred years to a human lifespan.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Janitor is a grade D, tier 2 creation.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Armada Wurm copies a tier-2, grade-C beast.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Grade D women can control their fertility cycles.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Humans vote on new geneline traits in two rounds and on attributes in one.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
