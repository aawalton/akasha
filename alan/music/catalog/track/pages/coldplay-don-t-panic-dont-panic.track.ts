import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayDonTPanicDontPanic = {
  id: "01a0b9ef-02c1-7173-942b-2c9b888eae77",
  type: "page-type/track",
  slug: "coldplay-don-t-panic-dont-panic",
  ownLength: 2.2811,
  ownProgress: 2.2811,
  partOfCollections: ["release/coldplay-don-t-panic", "release/coldplay-parachutes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Don't Panic",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "dontpanic|4gzpq5DPGxSnKTe4SA8HAU|136866",
  song: "song/coldplay-dont-panic",
  carriedBy: [
    {
      release: "release/coldplay-don-t-panic",
      discNumber: 1,
      position: 1,
      externalId: "62XuJOHM33VyWgKwNoj6w9",
      externalLink: "https://open.spotify.com/track/62XuJOHM33VyWgKwNoj6w9",
    },
    {
      release: "release/coldplay-parachutes",
      discNumber: 1,
      position: 1,
      externalId: "2QhURnm7mQDxBb5jWkbDug",
      externalLink: "https://open.spotify.com/track/2QhURnm7mQDxBb5jWkbDug",
    },
  ],
} as const satisfies Track
