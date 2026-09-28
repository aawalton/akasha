import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVUshia = {
  id: "01a0e9f6-e50b-7d51-afbf-58b117b7338b",
  type: "page-type/lore",
  slug: "otherwhere-v-ushia",
  title: "Ushia Mur",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-ushia",
  facts: [
    {
      fact: "Ushia Mur is an orcish Questor woman, about nine feet tall, with green lips and great teeth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She wears a rainbow-striped robe and is held to be the greatest seer on Davrar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She founded the Seers of Itonia, who read fate for pilgrims from a cave above Itonia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is poor at magery beyond scrying but excels at wizardry.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She fights unarmed, guiding her blows by foresight.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She has shaped the orcish empire of Agmon from afar to check Giantsrest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Giantsrest's rulers call her the Seer, and Badud calls her Ushuaia.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She belongs to Sarya's grid of Questors, with Brox and Garna.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She sends cryptic messages marked with smiling faces.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season she guides Agmon's military from a distance.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
