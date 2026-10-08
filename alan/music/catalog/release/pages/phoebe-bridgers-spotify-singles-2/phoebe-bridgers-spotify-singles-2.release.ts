import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const phoebeBridgersSpotifySingles2 = {
  id: "01a0676a-d72a-700c-b0a2-82665d1fbebc",
  type: "page-type/release",
  slug: "phoebe-bridgers-spotify-singles-2",
  title: "Spotify Singles",
  partOfCollections: ["artist/phoebe-bridgers"],
  position: 0,
  ownLength: 7.4072,
  ownProgress: 7.4072,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-03-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1pBRAyTNXs1QRRAFRZ4Ygs",
      externalLink: "https://open.spotify.com/album/1pBRAyTNXs1QRRAFRZ4Ygs",
    },
  ],
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-09-15T16:38:50.000Z",
} as const satisfies Release
