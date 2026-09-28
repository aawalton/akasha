import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXSkinwalker = {
  id: "01a0ea75-82d9-7047-a3c5-9824b9dfb157",
  type: "page-type/lore",
  slug: "otherwhere-x-skinwalker",
  title: "Skinwalker",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-species/otherwhere-x-skinwalker",
  facts: [
    {
      fact: "Skinwalkers are real and greatly feared.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A skinwalker carries a skinwalker skill that shows on an assessment tablet readout.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Soldiers screen suspected skinwalkers with an assessment tablet.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A lone, strangely calm survivor of a disaster may be suspected of being a skinwalker.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Soldiers cuff a suspect and threaten beheading if they refuse assessment.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An odd, creepy stare can be enough to draw a soldier's skinwalker suspicion.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Soldiers joke that no real skinwalker would ever ask whether it is one.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Once a readout clears a suspect, the soldiers apologize and drop their hostility.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
