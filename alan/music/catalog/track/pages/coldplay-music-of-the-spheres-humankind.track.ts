import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMusicOfTheSpheresHumankind = {
  id: "01a0b9ee-cd4e-71dd-b92f-7dab2a75e2d2",
  type: "page-type/track",
  slug: "coldplay-music-of-the-spheres-humankind",
  ownLength: 4.445083333333334,
  ownProgress: 4.445083333333334,
  partOfCollections: ["release/coldplay-music-of-the-spheres"],
  status: "completed",
  unit: "unit/minutes",
  title: "Humankind",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "humankind|4gzpq5DPGxSnKTe4SA8HAU|266705",
  song: "song/coldplay-humankind",
  carriedBy: [
    {
      release: "release/coldplay-music-of-the-spheres",
      discNumber: 1,
      position: 3,
      externalId: "23BO6YozrAXUta1buxFZ80",
      externalLink: "https://open.spotify.com/track/23BO6YozrAXUta1buxFZ80",
    },
  ],
} as const satisfies Track
