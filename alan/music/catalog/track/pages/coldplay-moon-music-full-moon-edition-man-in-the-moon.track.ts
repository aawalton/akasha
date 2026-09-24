import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionManInTheMoon = {
  id: "01a0b9ee-cc6f-78cd-b976-011ebdb8edeb",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-man-in-the-moon",
  ownLength: 3.91,
  ownProgress: 3.91,
  partOfCollections: ["release/coldplay-moon-music-full-moon-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Man in The Moon",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "maninthemoon|4gzpq5DPGxSnKTe4SA8HAU|234600",
  song: "song/coldplay-man-in-the-moon",
  carriedBy: [
    {
      release: "release/coldplay-moon-music-full-moon-edition",
      discNumber: 2,
      position: 7,
      externalId: "5NPe4fAhaMwcho571EJXDi",
      externalLink: "https://open.spotify.com/track/5NPe4fAhaMwcho571EJXDi",
    },
  ],
} as const satisfies Track
