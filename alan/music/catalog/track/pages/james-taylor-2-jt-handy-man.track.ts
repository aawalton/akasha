import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JtHandyMan = {
  id: "01a0abeb-468e-7ecc-ab6b-bc23793b98ee",
  type: "page-type/track",
  slug: "james-taylor-2-jt-handy-man",
  ownLength: 3.3074166666666667,
  ownProgress: 3.3074166666666667,
  partOfCollections: ["release/james-taylor-2-jt"],
  status: "completed",
  unit: "unit/minutes",
  title: "Handy Man",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "handyman|0vn7UBvSQECKJm2817Yf1P|198445",
  song: "song/james-taylor-handy-man",
  carriedBy: [
    {
      release: "release/james-taylor-2-jt",
      discNumber: 1,
      position: 7,
      externalId: "70aUjWZmd9F3bRSsR4DwAJ",
      externalLink: "https://open.spotify.com/track/70aUjWZmd9F3bRSsR4DwAJ",
    },
  ],
} as const satisfies Track
