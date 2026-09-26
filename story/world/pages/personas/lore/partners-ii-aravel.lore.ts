import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiAravel = {
  id: "01a0de0a-0345-7161-acb1-0988049f7c13",
  type: "page-type/lore",
  slug: "partners-ii-aravel",
  title: "Aravel",
  world: "world/personas",
  about: "story-played/partners-ii",
  facts: [
    {
      fact: "In Aravel power flows through bonds, and the Linked grow by each other.",
      knowers: ["lore-disclosure/game-master", "character-player/partners-ii-alan"],
    },
    {
      fact: "Aravel has two moons.",
      knowers: ["lore-disclosure/game-master", "character-player/partners-ii-alan"],
    },
    {
      fact: "Aravel's roads go where they go, and the road behind Alan does not go back.",
      knowers: ["lore-disclosure/game-master", "character-player/partners-ii-alan"],
    },
    {
      fact: "Every person in Aravel carries exactly one Talent, unique to them.",
      knowers: ["lore-disclosure/game-master", "character-player/partners-ii-alan"],
    },
    {
      fact: "A Talent does not level; it deepens.",
      knowers: ["lore-disclosure/game-master", "character-player/partners-ii-alan"],
    },
    {
      fact: "How a Talent deepens is hidden.",
      knowers: ["lore-disclosure/game-master", "character-player/partners-ii-alan"],
    },
    {
      fact: "Affinities exist in Aravel, and nothing more of them is known.",
      knowers: ["lore-disclosure/game-master", "character-player/partners-ii-alan"],
    },
  ],
} as const satisfies Lore
