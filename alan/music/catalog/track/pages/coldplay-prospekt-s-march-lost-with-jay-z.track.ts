import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayProspektSMarchLostWithJayZ = {
  id: "01a0b9ee-fcad-700b-a1fe-6bfd446a7114",
  type: "page-type/track",
  slug: "coldplay-prospekt-s-march-lost-with-jay-z",
  ownLength: 4.2818,
  ownProgress: 4.2818,
  partOfCollections: [
    "release/coldplay-prospekt-s-march",
    "release/coldplay-viva-la-vida-prospekt-s-march-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Lost+ (with Jay-Z)",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "lostwithjayz|4gzpq5DPGxSnKTe4SA8HAU|256908",
  song: "song/coldplay-lost",
  carriedBy: [
    {
      release: "release/coldplay-prospekt-s-march",
      discNumber: 1,
      position: 6,
      externalId: "1GAsLXwdWOU0fOHY9rJVc8",
      externalLink: "https://open.spotify.com/track/1GAsLXwdWOU0fOHY9rJVc8",
    },
    {
      release: "release/coldplay-viva-la-vida-prospekt-s-march-edition",
      discNumber: 2,
      position: 6,
      externalId: "1y0ZoHeeEd0XTT8X7SnSq3",
      externalLink: "https://open.spotify.com/track/1y0ZoHeeEd0XTT8X7SnSq3",
    },
  ],
} as const satisfies Track
