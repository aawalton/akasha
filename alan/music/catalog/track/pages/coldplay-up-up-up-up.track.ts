import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayUpUpUpUp = {
  id: "01a0b9ee-f4cf-7a55-a995-e32fdbf863c5",
  type: "page-type/track",
  slug: "coldplay-up-up-up-up",
  ownLength: 3.9682166666666667,
  ownProgress: 3.9682166666666667,
  partOfCollections: ["release/coldplay-up-up"],
  status: "completed",
  unit: "unit/minutes",
  title: "Up&Up",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "upup|4gzpq5DPGxSnKTe4SA8HAU|238093",
  song: "song/coldplay-up-up",
  carriedBy: [
    {
      release: "release/coldplay-up-up",
      discNumber: 1,
      position: 1,
      externalId: "4a8pP5X2lxwU5aprY44jLn",
      externalLink: "https://open.spotify.com/track/4a8pP5X2lxwU5aprY44jLn",
    },
  ],
} as const satisfies Track
