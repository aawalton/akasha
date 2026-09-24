import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionOneWorld = {
  id: "01a0b9ee-cb79-78cb-ae79-35ac5a863467",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-one-world",
  ownLength: 6.794266666666666,
  ownProgress: 6.794266666666666,
  partOfCollections: [
    "release/coldplay-moon-music-full-moon-edition",
    "release/coldplay-moon-music",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "ONE WORLD",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "oneworld|4gzpq5DPGxSnKTe4SA8HAU|407656",
  song: "song/coldplay-one-world",
  carriedBy: [
    {
      release: "release/coldplay-moon-music",
      discNumber: 1,
      position: 10,
      externalId: "7HFJpnjKUS7LGl8NiyfUE3",
      externalLink: "https://open.spotify.com/track/7HFJpnjKUS7LGl8NiyfUE3",
    },
    {
      release: "release/coldplay-moon-music-full-moon-edition",
      discNumber: 1,
      position: 10,
      externalId: "66KIWk0JIZDOAfsYDCosVP",
      externalLink: "https://open.spotify.com/track/66KIWk0JIZDOAfsYDCosVP",
    },
  ],
} as const satisfies Track
