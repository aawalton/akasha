import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiAravel = {
  id: "01a0de0a-0345-7161-acb1-0988049f7c13",
  type: "page-type/lore",
  slug: "partners-ii-aravel",
  title: "Aravel",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "In Aravel power flows through bonds, and the Linked grow by each other.",
    "Aravel has two moons.",
    "Aravel's roads go where they go, and the road behind Alan does not go back.",
    "Every person in Aravel carries exactly one Talent, unique to them.",
    "A Talent does not level; it deepens.",
    "How a Talent deepens is hidden.",
    "Affinities exist in Aravel, and nothing more of them is known.",
  ],
} as const satisfies Lore
