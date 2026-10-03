import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIGreteHolm = {
  id: "01a0ed2b-1dd6-738d-b682-8e59efe6b994",
  type: "page-type/lore",
  slug: "overwhere-i-grete-holm",
  title: "Grete Holm",
  world: "world/hell-hound-evolution-litrpg",
  facts: [
    {
      fact: "Grete Holm is board-master of the Hunters' Board at Antler Hall in Wendlow.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-i-nala",
        "lore/overwhere-i-grete-holm",
      ],
    },
    {
      fact: "Analyze shows her as Human - Level 38, the highest level in Wendlow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She hunted monsters for twenty years, and lost her right hand to a Chardbark Colossus.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is broad, weathered and grey-blonde, with a steel hook for a hand and a laugh like a bark.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her Analyze is high enough to show vitals, attributes and Class names, not only species and level.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She Analyzes every hunter who asks for a bounty, to judge whether they could have made the kill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She wants capable hunters on her board; the best have gone north for the war bounties.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She pays bounties on proof: a head, a pelt, or a witness she trusts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A grown Level 1 woman with far higher attributes would fascinate and alarm her.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She would offer such a woman board work at once, and watch her closely.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Grete looked in Ghost-Eye's cask and grunted at its skull, scarred crest and empty left socket.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-i-nala",
        "lore/overwhere-i-grete-holm",
      ],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
