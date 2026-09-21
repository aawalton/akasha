import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theHoldernessFamilyIMAdulting = {
  id: "01a0676a-d721-702f-baaa-c0030e0ded41",
  type: "page-type/release",
  slug: "the-holderness-family-i-m-adulting",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-holderness-family"],
  position: 0,
  publishedAt: "2019-09-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2mPDw6UcLtbdcYhLuTUDay",
      externalLink: "https://open.spotify.com/album/2mPDw6UcLtbdcYhLuTUDay",
      lastSyncedAt: "2025-11-27",
    },
  ],
  title: "I'm Adulting",
} as const satisfies Release
