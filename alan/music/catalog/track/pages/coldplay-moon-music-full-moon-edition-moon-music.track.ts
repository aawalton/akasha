import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionMoonMusic = {
  id: "01a0b9ee-ca34-7b3b-89c2-6f415a7480a5",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-moon-music",
  ownLength: 4.607933333333333,
  ownProgress: 4.607933333333333,
  partOfCollections: [
    "release/coldplay-moon-music-full-moon-edition",
    "release/coldplay-moon-music",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "MOON MUSiC",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }, { artistName: "Jon Hopkins" }],
  trackKey: "moonmusic|4gzpq5DPGxSnKTe4SA8HAU,7yxi31szvlbwvKq9dYOmFI|276476",
  song: "song/coldplay-moon-music",
  carriedBy: [
    {
      release: "release/coldplay-moon-music",
      discNumber: 1,
      position: 1,
      externalId: "41FNZsY7w7KaTQ2bjxdR6w",
      externalLink: "https://open.spotify.com/track/41FNZsY7w7KaTQ2bjxdR6w",
    },
    {
      release: "release/coldplay-moon-music-full-moon-edition",
      discNumber: 1,
      position: 1,
      externalId: "4mEWgqYOEiygF1mzEn901R",
      externalLink: "https://open.spotify.com/track/4mEWgqYOEiygF1mzEn901R",
    },
  ],
} as const satisfies Track
