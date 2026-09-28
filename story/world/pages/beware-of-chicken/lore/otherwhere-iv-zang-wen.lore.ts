import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIvZangWen = {
  id: "01a0ea14-5fb0-7a3c-ad20-baa227d91a72",
  type: "page-type/lore",
  slug: "otherwhere-iv-zang-wen",
  title: "Zang Wen",
  world: "world/beware-of-chicken",
  facts: [
    {
      fact: "Zang Wen was a Zang disciple who learned the Sect's true founding from an ancestor's memory crystal.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Inquisitors tortured Zang Wen and tried to erase her memory, but she never broke.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Zang Wen escaped to the foxes, became Su Nezan's mate, and fought the Sect until her death.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The foxes honour Zang Wen as a hero who became living lightning in her final battle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Zang Wen's last fight killed three Shrouded Mountain Elders and nearly a thousand cultivators.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
