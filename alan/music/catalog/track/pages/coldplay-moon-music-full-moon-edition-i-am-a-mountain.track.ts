import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionIAmAMountain = {
  id: "01a0b9ee-cc93-71dc-99a1-0941d7392f04",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-i-am-a-mountain",
  ownLength: 3.1135,
  ownProgress: 3.1135,
  partOfCollections: ["release/coldplay-moon-music-full-moon-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "i Am A Mountain",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "iamamountain|4gzpq5DPGxSnKTe4SA8HAU|186810",
  song: "song/coldplay-i-am-a-mountain",
  carriedBy: [
    {
      release: "release/coldplay-moon-music-full-moon-edition",
      discNumber: 2,
      position: 8,
      externalId: "2NYCEJK25YURZTQSA0msEZ",
      externalLink: "https://open.spotify.com/track/2NYCEJK25YURZTQSA0msEZ",
    },
  ],
} as const satisfies Track
