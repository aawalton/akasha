import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMusicOfTheSpheresUntitled5 = {
  id: "01a0b9ee-ce86-7e0a-8986-7d4f3956108a",
  type: "page-type/track",
  slug: "coldplay-music-of-the-spheres-untitled-5",
  ownLength: 3.769,
  ownProgress: 3.769,
  partOfCollections: ["release/coldplay-music-of-the-spheres"],
  status: "completed",
  unit: "unit/minutes",
  title: "♾",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "|4gzpq5DPGxSnKTe4SA8HAU|226140",
  song: "song/coldplay-untitled",
  carriedBy: [
    {
      release: "release/coldplay-music-of-the-spheres",
      discNumber: 1,
      position: 11,
      externalId: "2wleRXcIPqltoDPLMH5WDa",
      externalLink: "https://open.spotify.com/track/2wleRXcIPqltoDPLMH5WDa",
    },
  ],
} as const satisfies Track
