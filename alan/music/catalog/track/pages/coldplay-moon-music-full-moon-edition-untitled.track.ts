import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionUntitled = {
  id: "01a0b9ee-caee-73f0-a3f0-fe64cd77ac4f",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-untitled",
  ownLength: 6.159966666666667,
  ownProgress: 6.159966666666667,
  partOfCollections: [
    "release/coldplay-moon-music-full-moon-edition",
    "release/coldplay-moon-music",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "🌈",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "|4gzpq5DPGxSnKTe4SA8HAU|369598",
  song: "song/coldplay-untitled-7",
  carriedBy: [
    {
      release: "release/coldplay-moon-music",
      discNumber: 1,
      position: 6,
      externalId: "5lCyER2g9iYp4ozZ7iOKat",
      externalLink: "https://open.spotify.com/track/5lCyER2g9iYp4ozZ7iOKat",
    },
    {
      release: "release/coldplay-moon-music-full-moon-edition",
      discNumber: 1,
      position: 6,
      externalId: "5kHwM1BRcIukEIy8x0emV8",
      externalLink: "https://open.spotify.com/track/5kHwM1BRcIukEIy8x0emV8",
    },
  ],
} as const satisfies Track
