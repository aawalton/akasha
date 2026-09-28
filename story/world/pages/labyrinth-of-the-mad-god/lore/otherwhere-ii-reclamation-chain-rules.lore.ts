import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiReclamationChainRules = {
  id: "01a0e9da-48b0-794e-82ec-b73f99eb01b0",
  type: "page-type/lore",
  slug: "otherwhere-ii-reclamation-chain-rules",
  title: "Rules of the Reclamation Chain",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Each tower level awards a party rating, experience, essence and species experience.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A level's individual reward can be a chest, a training stay or a species pill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bonus objectives include killing boss-class beasts and injuring a level's boss.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A party that uses a secret stair or aids an allied party earns bonus credit.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The tower climb has difficulty courses, and humanity's is the tier-1 course.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Participants rest in a communal safe room for their species between stages.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The chain's final battle lasts one hour in timed phases.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Beast portals open every three minutes, soldier portals every five.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Giant portals open faster as the battle goes on.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
