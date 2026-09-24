import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMusicOfTheSpheresUntitled = {
  id: "01a0b9ee-cd01-7e6d-8545-67ce4aa80f34",
  type: "page-type/track",
  slug: "coldplay-music-of-the-spheres-untitled",
  ownLength: 0.8864,
  ownProgress: 0.8864,
  partOfCollections: ["release/coldplay-music-of-the-spheres"],
  status: "completed",
  unit: "unit/minutes",
  title: "🪐",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "|4gzpq5DPGxSnKTe4SA8HAU|53184",
  song: "song/coldplay-untitled-2",
  carriedBy: [
    {
      release: "release/coldplay-music-of-the-spheres",
      discNumber: 1,
      position: 1,
      externalId: "1a3G9SNslcKsPAOuIikaxd",
      externalLink: "https://open.spotify.com/track/1a3G9SNslcKsPAOuIikaxd",
    },
  ],
} as const satisfies Track
