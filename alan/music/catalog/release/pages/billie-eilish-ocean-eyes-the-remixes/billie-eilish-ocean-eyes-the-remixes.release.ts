import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishOceanEyesTheRemixes = {
  id: "01a0676a-d726-7013-8410-b1f2102ca5f8",
  type: "page-type/release",
  slug: "billie-eilish-ocean-eyes-the-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2017-01-13",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "44OSkEmvHwdTFhPBCewIks",
      externalLink: "https://open.spotify.com/album/44OSkEmvHwdTFhPBCewIks",
    },
  ],
  title: "Ocean Eyes (The Remixes)",
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
