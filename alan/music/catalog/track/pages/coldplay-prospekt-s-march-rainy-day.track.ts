import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayProspektSMarchRainyDay = {
  id: "01a0b9ee-fc5f-7041-8304-0d7ef9ed414c",
  type: "page-type/track",
  slug: "coldplay-prospekt-s-march-rainy-day",
  ownLength: 3.4333666666666667,
  ownProgress: 3.4333666666666667,
  partOfCollections: [
    "release/coldplay-prospekt-s-march",
    "release/coldplay-viva-la-vida-prospekt-s-march-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Rainy Day",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "rainyday|4gzpq5DPGxSnKTe4SA8HAU|206002",
  song: "song/coldplay-rainy-day",
  carriedBy: [
    {
      release: "release/coldplay-prospekt-s-march",
      discNumber: 1,
      position: 4,
      externalId: "49m9whshOPxI2qBzWBNKwk",
      externalLink: "https://open.spotify.com/track/49m9whshOPxI2qBzWBNKwk",
    },
    {
      release: "release/coldplay-viva-la-vida-prospekt-s-march-edition",
      discNumber: 2,
      position: 4,
      externalId: "551YulB9BVtzcCQl0vX6nC",
      externalLink: "https://open.spotify.com/track/551YulB9BVtzcCQl0vX6nC",
    },
  ],
} as const satisfies Track
