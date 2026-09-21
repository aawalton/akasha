import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiTheHighSongMendeleyevRemix = {
  id: "01a0676a-d72d-7021-b9fb-251db8dc7b5b",
  type: "page-type/release",
  slug: "vinny-marchi-the-high-song-mendeleyev-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2023-07-07",
  grade: "C",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2oHk4i8huPfhhieOn7XKJu",
      externalLink: "https://open.spotify.com/album/2oHk4i8huPfhhieOn7XKJu",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "The High Song (Mendeleyev Remix)",
} as const satisfies Release
