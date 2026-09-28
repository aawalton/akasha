import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiiLawrenceStop = {
  id: "01a0ea15-1850-7a08-b6a5-dc11155eda3d",
  type: "page-type/place",
  slug: "otherwhere-iii-lawrence-stop",
  title: "The Lawrence Stop",
  world: "world/super-supportive",
  facts: [
    {
      fact: "Lawrence is a rebuilt elevated station with a glass-walled platform, a stair and an elevator.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
  within: "place/otherwhere-iii-chicago",
} as const satisfies Place
