import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayTalk = {
  id: "01a0676a-d72b-701e-a1ca-c29888b92500",
  type: "page-type/release",
  slug: "coldplay-talk",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2005-12-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Pfwiiwar1e7p5N7r8Wdeb",
      externalLink: "https://open.spotify.com/album/0Pfwiiwar1e7p5N7r8Wdeb",
    },
  ],
  title: "Talk",
  createdAt: "2026-09-03T13:17:30.283Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
