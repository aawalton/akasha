import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVivaLaVidaOrDeathAndAllHisFriends42 = {
  id: "01a0b9ee-e2e0-7d60-808e-4a85ab0c7ac8",
  type: "page-type/track",
  slug: "coldplay-viva-la-vida-or-death-and-all-his-friends-42",
  ownLength: 3.9566666666666666,
  ownProgress: 3.9566666666666666,
  partOfCollections: [
    "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
    "release/coldplay-viva-la-vida-prospekt-s-march-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "42",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "42|4gzpq5DPGxSnKTe4SA8HAU|237400",
  song: "song/coldplay-42",
  carriedBy: [
    {
      release: "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
      discNumber: 1,
      position: 4,
      externalId: "2i2Lz3FDIqYdsJZEWkEaTC",
      externalLink: "https://open.spotify.com/track/2i2Lz3FDIqYdsJZEWkEaTC",
    },
    {
      release: "release/coldplay-viva-la-vida-prospekt-s-march-edition",
      discNumber: 1,
      position: 4,
      externalId: "50CsvQKRsEd9wiYMcdsHeg",
      externalLink: "https://open.spotify.com/track/50CsvQKRsEd9wiYMcdsHeg",
    },
  ],
} as const satisfies Track
