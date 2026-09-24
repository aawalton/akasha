import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionJupiter = {
  id: "01a0b9ee-caa1-7283-9c77-cb4a3b5ebbc9",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-jupiter",
  ownLength: 4.008466666666667,
  ownProgress: 4.008466666666667,
  partOfCollections: [
    "release/coldplay-moon-music-full-moon-edition",
    "release/coldplay-moon-music",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "JUPiTER",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "jupiter|4gzpq5DPGxSnKTe4SA8HAU|240508",
  song: "song/coldplay-jupiter",
  carriedBy: [
    {
      release: "release/coldplay-moon-music",
      discNumber: 1,
      position: 4,
      externalId: "3EbRbM7qyJq9qjRqDIwBTO",
      externalLink: "https://open.spotify.com/track/3EbRbM7qyJq9qjRqDIwBTO",
    },
    {
      release: "release/coldplay-moon-music-full-moon-edition",
      discNumber: 1,
      position: 4,
      externalId: "3Bc8H4AiPnI8yECFhs6Y3O",
      externalLink: "https://open.spotify.com/track/3Bc8H4AiPnI8yECFhs6Y3O",
    },
  ],
} as const satisfies Track
