import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayOrphansArabesque = {
  id: "01a0676a-d726-704d-8d82-9deea1d89de8",
  type: "page-type/release",
  slug: "coldplay-orphans-arabesque",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2019-10-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1SnoyXTgl1jmhfmPwpKDCI",
      externalLink: "https://open.spotify.com/album/1SnoyXTgl1jmhfmPwpKDCI",
    },
  ],
  title: "Orphans / Arabesque",
} as const satisfies Release
