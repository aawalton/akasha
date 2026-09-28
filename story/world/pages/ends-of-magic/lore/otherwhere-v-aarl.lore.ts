import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVAarl = {
  id: "01a0e9f3-638a-7ede-b5da-f741ec38e64a",
  type: "page-type/lore",
  slug: "otherwhere-v-aarl",
  title: "Aarl",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-aarl",
  facts: [
    {
      fact: "Aarl is a young human adventurer of Gemore, twin brother of Sarah and son of Stanel.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aarl is coppery-skinned, jokey and bold, a melee fighter who likes to switch weapons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aarl's parents equipped him with some of the best gear to be had in Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aarl's forebears were slaves of Giantsrest, and he holds Gemore's hatred of that empire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Aarl adventures out of Gemore with his sister and has never met Nathan Lark.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
