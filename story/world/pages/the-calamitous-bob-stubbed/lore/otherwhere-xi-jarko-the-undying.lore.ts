import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiJarkoTheUndying = {
  id: "01a0ea87-ff06-77da-ab15-cbd10b4466a4",
  type: "page-type/lore",
  slug: "otherwhere-xi-jarko-the-undying",
  title: "Jar'ko the Undying",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-jarko-the-undying",
  facts: [
    {
      fact: "Jar'ko the Undying was an assassin and one of Nero Oleander's chosen lieutenants.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jar'ko was hard to kill, as his name promised, and had come back from death before.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The hadal Irao, whose path kills the undying, ended Jar'ko for good; Jar'ko is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
