import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionIaam = {
  id: "01a0b9ee-cb12-7acc-badf-56f84fb35351",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-iaam",
  ownLength: 3.0561833333333333,
  ownProgress: 3.0561833333333333,
  partOfCollections: [
    "release/coldplay-moon-music-full-moon-edition",
    "release/coldplay-moon-music",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "iAAM",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "iaam|4gzpq5DPGxSnKTe4SA8HAU|183371",
  song: "song/coldplay-iaam",
  carriedBy: [
    {
      release: "release/coldplay-moon-music",
      discNumber: 1,
      position: 7,
      externalId: "1uwmf1x4LQLGv1P1xjJFYk",
      externalLink: "https://open.spotify.com/track/1uwmf1x4LQLGv1P1xjJFYk",
    },
    {
      release: "release/coldplay-moon-music-full-moon-edition",
      discNumber: 1,
      position: 7,
      externalId: "2uaihUX7HbKyXBpFxOUT2a",
      externalLink: "https://open.spotify.com/track/2uaihUX7HbKyXBpFxOUT2a",
    },
  ],
} as const satisfies Track
