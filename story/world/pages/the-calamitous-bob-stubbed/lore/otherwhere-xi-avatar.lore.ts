import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiAvatar = {
  id: "01a0ea84-11c5-70b9-8540-546ee68c0363",
  type: "page-type/lore",
  slug: "otherwhere-xi-avatar",
  title: "Avatar",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-mechanic/otherwhere-xi-avatar",
  facts: [
    {
      fact: "An avatar is a mortal vessel through which a god's power takes flesh.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Incarnation is how gods fight, kill and die.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A god's incarnation thins the fabric of reality.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Too many gods incarnate at once would collapse reality and turn all to dust.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gods fighting directly would ruin the land and consume the souls of the slain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A god's first incarnation is a fateful thing.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gods also act through heralds, champions, visions, fate, and divine skills and blessings.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Symbolic defeats wound a god's essence.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "A god may channel power through a servant without making them an avatar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A god's champion may follow a unique path, such as the path of Maranor's Champion.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The monstrous parts of a slain avatar are safe to eat.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
