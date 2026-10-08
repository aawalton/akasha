import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMusicOfTheSpheresColoratura = {
  id: "01a0b9ee-ceb1-70ee-bcb9-3deda6ff3b65",
  type: "page-type/track",
  slug: "coldplay-music-of-the-spheres-coloratura",
  ownLength: 10.284283333333333,
  ownProgress: 10.284283333333333,
  partOfCollections: ["release/coldplay-music-of-the-spheres"],
  status: "completed",
  unit: "unit/minutes",
  title: "Coloratura",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "coloratura|4gzpq5DPGxSnKTe4SA8HAU|617057",
  song: "song/coldplay-coloratura",
  carriedBy: [
    {
      release: "release/coldplay-music-of-the-spheres",
      discNumber: 1,
      position: 12,
      externalId: "0jH7gF7KCk2Lom9gimaKms",
      externalLink: "https://open.spotify.com/track/0jH7gF7KCk2Lom9gimaKms",
    },
  ],
  createdAt: "2026-09-19T13:50:30.577Z",
  updatedAt: "2026-09-24T19:59:17.000Z",
} as const satisfies Track
