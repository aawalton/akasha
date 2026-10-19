import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixWeNeedALittleChristmas = {
  id: "01a0676a-d730-7034-99d5-d25c81319d87",
  type: "page-type/release",
  slug: "pentatonix-we-need-a-little-christmas",
  title: "We Need A Little Christmas",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-11-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "090o9kMZEhvkB5Vw211meV",
      externalLink: "https://open.spotify.com/album/090o9kMZEhvkB5Vw211meV",
    },
  ],
  createdAt: "2026-09-03T13:17:30.288Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
