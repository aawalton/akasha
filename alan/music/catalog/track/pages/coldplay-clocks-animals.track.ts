import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayClocksAnimals = {
  id: "01a0b9ef-0140-7347-b764-f20d7978af24",
  type: "page-type/track",
  slug: "coldplay-clocks-animals",
  ownLength: 5.554433333333333,
  ownProgress: 5.554433333333333,
  partOfCollections: ["release/coldplay-clocks"],
  status: "completed",
  unit: "unit/minutes",
  title: "Animals",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "animals|4gzpq5DPGxSnKTe4SA8HAU|333266",
  song: "song/coldplay-animals",
  carriedBy: [
    {
      release: "release/coldplay-clocks",
      discNumber: 1,
      position: 3,
      externalId: "59tjfzA98dum1TXhJ4XWoe",
      externalLink: "https://open.spotify.com/track/59tjfzA98dum1TXhJ4XWoe",
    },
  ],
} as const satisfies Track
