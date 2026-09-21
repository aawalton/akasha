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
} as const satisfies Release
