import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxEvolvingCreature = {
  id: "01a0ea37-d781-7962-abab-d04bce52d5c5",
  type: "page-type/lore",
  slug: "otherwhere-ix-evolving-creature",
  title: "Evolving creature",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-evolving-creature",
  facts: [
    {
      fact: "Evolving creatures are made monsters, sold to the lords of Malari by a demon breeder.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At sale they look cuddly and plush, harmless things fit for a lord's hall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They eat only intelligent creatures, bipeds by preference, taken alive and unaware.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "If one smells fear on its prey it kills the prey but will not eat it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They evolve as they feed; one grew claws and teleportation, then regeneration, in weeks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The same one learned to dissolve; a guard's sword melted inside it and its skin hardened.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A well-fed one may outgrow any D Grade monster and perhaps many C Grades.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Each is bound to an emerald Ring of Control, forged with it and holding its essence.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Only the creature's maker can craft another ring for it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Malari lords buy them in an arms race, each house trying to outdo the others' purchases.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
