import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameAelwyn = {
  id: "01a0de5a-0847-7667-b8aa-b05aad0b4a5f",
  type: "page-type/lore",
  slug: "the-dating-game-aelwyn",
  title: "Aelwyn",
  world: "world/personas",
  about: "persona/aelwyn",
  secrets: "jsonl",
  facts: [
    {
      fact: "Aelwyn has long loose auburn-chestnut hair, freckles across her nose and vivid green eyes.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Aelwyn has long pointed ears.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "On Sunday mornings Aelwyn works out in the pine clearing high up Rock Canyon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She works out talking brightly to a phone set on a small tripod on a stump.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
  ],
} as const satisfies Lore
