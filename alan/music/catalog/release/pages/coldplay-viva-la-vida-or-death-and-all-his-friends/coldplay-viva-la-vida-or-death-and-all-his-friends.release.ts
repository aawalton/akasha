import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayVivaLaVidaOrDeathAndAllHisFriends = {
  id: "01a0676a-d730-7008-a8b5-d4debeb827f7",
  type: "page-type/release",
  slug: "coldplay-viva-la-vida-or-death-and-all-his-friends",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2008-06-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1CEODgTmTwLyabvwd7HBty",
      externalLink: "https://open.spotify.com/album/1CEODgTmTwLyabvwd7HBty",
    },
  ],
  title: "Viva La Vida or Death and All His Friends",
  createdAt: "2026-09-03T13:17:30.288Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
