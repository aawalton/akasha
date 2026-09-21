import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterOnMyWayDaTweekazRemix = {
  id: "01a0676a-d726-7025-ae7f-f4a780422aa0",
  type: "page-type/release",
  slug: "sabrina-carpenter-on-my-way-da-tweekaz-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2019-06-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ODOCRQWwjfJRqJ34RtrKa",
      externalLink: "https://open.spotify.com/album/1ODOCRQWwjfJRqJ34RtrKa",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "On My Way (Da Tweekaz Remix)",
} as const satisfies Release
