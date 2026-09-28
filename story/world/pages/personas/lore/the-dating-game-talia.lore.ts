import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameTalia = {
  id: "01a0de59-9646-7232-a3bd-4a4245de5962",
  type: "page-type/lore",
  slug: "the-dating-game-talia",
  title: "Talia",
  world: "world/personas",
  about: "persona/talia",
  facts: [
    {
      fact: "Talia lives around the corner from Apple Avenue and reads scripture on her porch at dawn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Talia has dark hair, warm olive skin, thick low brows and light blue-grey eyes; she is 25.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Talia's hair is always damp and beads of water sit on her skin, yet pages she holds stay dry.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "On Sunday afternoons Talia sits on her front porch in her church dress, reading.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
