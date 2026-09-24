import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMusicOfTheSpheresHigherPower = {
  id: "01a0b9ee-cd27-7aac-9dc2-8d5ae77806c2",
  type: "page-type/track",
  slug: "coldplay-music-of-the-spheres-higher-power",
  ownLength: 3.4446833333333333,
  ownProgress: 3.4446833333333333,
  partOfCollections: ["release/coldplay-music-of-the-spheres"],
  status: "completed",
  unit: "unit/minutes",
  title: "Higher Power",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "higherpower|4gzpq5DPGxSnKTe4SA8HAU|206681",
  song: "song/coldplay-higher-power",
  carriedBy: [
    {
      release: "release/coldplay-music-of-the-spheres",
      discNumber: 1,
      position: 2,
      externalId: "65OR4ywy8Cgs3FDHK82Idl",
      externalLink: "https://open.spotify.com/track/65OR4ywy8Cgs3FDHK82Idl",
    },
  ],
} as const satisfies Track
