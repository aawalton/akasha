import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardMoonRiver = {
  id: "01a0abeb-2e30-75d4-b47d-3154ad33bfa6",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-moon-river",
  ownLength: 3.2202166666666665,
  ownProgress: 3.2202166666666665,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  status: "completed",
  unit: "unit/minutes",
  title: "Moon River",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "moonriver|0vn7UBvSQECKJm2817Yf1P|193213",
  song: "song/james-taylor-moon-river",
  carriedBy: [
    {
      release: "release/james-taylor-2-american-standard",
      discNumber: 1,
      position: 2,
      externalId: "46RxitOCzS5JhvDwongOS0",
      externalLink: "https://open.spotify.com/track/46RxitOCzS5JhvDwongOS0",
    },
  ],
} as const satisfies Track
