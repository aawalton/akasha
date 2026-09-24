import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverglowEverglowEdit = {
  id: "01a0b9ee-f451-733d-84d2-52a98b6ac9a2",
  type: "page-type/track",
  slug: "coldplay-everglow-everglow-edit",
  ownLength: 3.7917666666666667,
  ownProgress: 3.7917666666666667,
  partOfCollections: ["release/coldplay-everglow"],
  status: "completed",
  unit: "unit/minutes",
  title: "Everglow - Edit",
  trackType: "version",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "everglowedit|4gzpq5DPGxSnKTe4SA8HAU|227506",
  song: "song/coldplay-everglow",
  carriedBy: [
    {
      release: "release/coldplay-everglow",
      discNumber: 1,
      position: 1,
      externalId: "6aG68QSwv0hgNTq90I2GOE",
      externalLink: "https://open.spotify.com/track/6aG68QSwv0hgNTq90I2GOE",
    },
  ],
} as const satisfies Track
