import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylorJamesTaylorAtChristmasRiver = {
  id: "01a0abeb-2ce4-71f5-8d0c-2ea7b56ce90e",
  type: "page-type/track",
  slug: "james-taylor-james-taylor-at-christmas-river",
  grade: "A",
  ownLength: 3.5597666666666665,
  ownProgress: 3.5597666666666665,
  partOfCollections: ["release/james-taylor-james-taylor-at-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "River",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "river|0vn7UBvSQECKJm2817Yf1P|213586",
  song: "song/james-taylor-river",
  carriedBy: [
    {
      release: "release/james-taylor-james-taylor-at-christmas",
      discNumber: 1,
      position: 6,
      externalId: "2pRgR5prqaVWhQSBKXG8rb",
      externalLink: "https://open.spotify.com/track/2pRgR5prqaVWhQSBKXG8rb",
    },
  ],
} as const satisfies Track
