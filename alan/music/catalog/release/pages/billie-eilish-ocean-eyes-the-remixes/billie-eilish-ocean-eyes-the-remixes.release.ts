import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishOceanEyesTheRemixes = {
  id: "01a0676a-d726-7013-8410-b1f2102ca5f8",
  type: "release",
  slug: "billie-eilish-ocean-eyes-the-remixes",
  title: "Ocean Eyes (The Remixes)",
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  ownLength: 14.941083,
  ownProgress: 14.941083,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2017-01-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "44OSkEmvHwdTFhPBCewIks",
      externalLink: "https://open.spotify.com/album/44OSkEmvHwdTFhPBCewIks",
    },
  ],
} as const satisfies Release
