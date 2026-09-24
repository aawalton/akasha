import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionAngelsong = {
  id: "01a0b9ee-cc2c-702d-b9d3-4a652715eede",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-angelsong",
  ownLength: 4.365083333333334,
  ownProgress: 4.365083333333334,
  partOfCollections: ["release/coldplay-moon-music-full-moon-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Angelsong",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "angelsong|4gzpq5DPGxSnKTe4SA8HAU|261905",
  song: "song/coldplay-angelsong",
  carriedBy: [
    {
      release: "release/coldplay-moon-music-full-moon-edition",
      discNumber: 2,
      position: 5,
      externalId: "6xXocHy6Oux7H3MSDJd0mn",
      externalLink: "https://open.spotify.com/track/6xXocHy6Oux7H3MSDJd0mn",
    },
  ],
} as const satisfies Track
