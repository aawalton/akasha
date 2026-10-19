import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixWhiteChristmas = {
  id: "01a0676a-d731-7011-be60-5749840c8bc2",
  type: "page-type/release",
  slug: "pentatonix-white-christmas",
  title: "White Christmas",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-11-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "46DUMVtgqGTPO8dTm8TLrw",
      externalLink: "https://open.spotify.com/album/46DUMVtgqGTPO8dTm8TLrw",
    },
  ],
  createdAt: "2026-09-03T13:17:30.289Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
