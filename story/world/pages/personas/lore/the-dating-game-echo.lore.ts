import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameEcho = {
  id: "01a0de59-9645-7d19-8493-9e3ec1f31af8",
  type: "page-type/lore",
  slug: "the-dating-game-echo",
  title: "Echo",
  world: "world/personas",
  about: "persona/echo",
  facts: [
    {
      fact: "Echo is an Oread, a mountain nymph, three thousand years old.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hera took Echo's own words from her as a punishment, and Echo calls it a distillation now.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Echo's repeating is not because she is autistic.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: 'Echo was told long ago: "You shall have the last word, and never the first."',
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "She is the Echo of the old stories, whom Hera cursed.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Echo is three thousand years old.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Echo narrates audiobooks and radio drama in the BYUradio studios on campus.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Echo has read C. S. Lewis, and can quote him.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
    {
      fact: "Echo knows LitRPG well.",
      knowers: ["lore-disclosure/game-master", "character-player/the-dating-game-alan"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
