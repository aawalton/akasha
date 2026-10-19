import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixIJustCalledToSayILoveYou = {
  id: "01a0676a-d721-7022-bd57-a74ab957bd3c",
  type: "page-type/release",
  slug: "pentatonix-i-just-called-to-say-i-love-you",
  title: "I Just Called To Say I Love You",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-10-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7bka3HXnE5PRXwFWN0plgw",
      externalLink: "https://open.spotify.com/album/7bka3HXnE5PRXwFWN0plgw",
    },
  ],
  createdAt: "2026-09-03T13:17:30.273Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
