import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVioletHillVioletHill = {
  id: "01a0b9ee-fd27-777b-945b-c1322933728b",
  type: "page-type/track",
  slug: "coldplay-violet-hill-violet-hill",
  ownLength: 3.7108833333333333,
  ownProgress: 3.7108833333333333,
  partOfCollections: [
    "release/coldplay-violet-hill",
    "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
    "release/coldplay-viva-la-vida-prospekt-s-march-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Violet Hill",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "violethill|4gzpq5DPGxSnKTe4SA8HAU|222653",
  song: "song/coldplay-violet-hill",
  carriedBy: [
    {
      release: "release/coldplay-violet-hill",
      discNumber: 1,
      position: 1,
      externalId: "5GkNsL57ICbvte2aqyRkYD",
      externalLink: "https://open.spotify.com/track/5GkNsL57ICbvte2aqyRkYD",
    },
    {
      release: "release/coldplay-viva-la-vida-or-death-and-all-his-friends",
      discNumber: 1,
      position: 8,
      externalId: "1ZqHjApl3pfzwjweTfMi0g",
      externalLink: "https://open.spotify.com/track/1ZqHjApl3pfzwjweTfMi0g",
    },
    {
      release: "release/coldplay-viva-la-vida-prospekt-s-march-edition",
      discNumber: 1,
      position: 8,
      externalId: "62UfaFAh45l2jimrgvQRvB",
      externalLink: "https://open.spotify.com/track/62UfaFAh45l2jimrgvQRvB",
    },
  ],
} as const satisfies Track
