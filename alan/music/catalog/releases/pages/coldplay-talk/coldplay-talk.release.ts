import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const coldplayTalk = {
  id: "01a0676a-d72b-701e-a1ca-c29888b92500",
  type: "release",
  slug: "coldplay-talk",
  title: "Talk",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 29.789083,
  ownProgress: 29.789083,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2005-12-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Pfwiiwar1e7p5N7r8Wdeb",
      externalLink: "https://open.spotify.com/album/0Pfwiiwar1e7p5N7r8Wdeb",
    },
  ],
} as const satisfies Release
