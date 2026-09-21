import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayLive2012 = {
  id: "01a0676a-d723-7040-865a-c68205bba152",
  type: "page-type/release",
  slug: "coldplay-live-2012",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2012-11-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2OkEsqGTfu8PWRrNHzfr0m",
      externalLink: "https://open.spotify.com/album/2OkEsqGTfu8PWRrNHzfr0m",
    },
  ],
  title: "Live 2012",
} as const satisfies Release
