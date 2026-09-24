import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele25Remedy = {
  id: "01a0d52b-c25a-7099-9e53-6c5644b88874",
  type: "page-type/track",
  slug: "adele-25-remedy",
  ownLength: 4.090433333333333,
  ownProgress: 0,
  partOfCollections: ["release/adele-25"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Remedy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "remedy|4dpARuHxo51G3z768sgnrY|245426",
  song: "song/adele-remedy",
  carriedBy: [
    {
      release: "release/adele-25",
      discNumber: 1,
      position: 5,
      externalId: "5CjKwY7FUJgKSwTVzoQIaU",
      externalLink: "https://open.spotify.com/track/5CjKwY7FUJgKSwTVzoQIaU",
    },
  ],
} as const satisfies Track
