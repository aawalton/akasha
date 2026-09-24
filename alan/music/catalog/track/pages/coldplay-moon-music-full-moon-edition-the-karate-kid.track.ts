import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionTheKarateKid = {
  id: "01a0b9ee-cbe7-720a-85f6-272f13fed67d",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-the-karate-kid",
  ownLength: 2.9244333333333334,
  ownProgress: 2.9244333333333334,
  partOfCollections: ["release/coldplay-moon-music-full-moon-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Karate Kid",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "thekaratekid|4gzpq5DPGxSnKTe4SA8HAU|175466",
  song: "song/coldplay-the-karate-kid",
  carriedBy: [
    {
      release: "release/coldplay-moon-music-full-moon-edition",
      discNumber: 2,
      position: 3,
      externalId: "0cZEkGxb0V9MbpzHzpKp9F",
      externalLink: "https://open.spotify.com/track/0cZEkGxb0V9MbpzHzpKp9F",
    },
  ],
} as const satisfies Track
