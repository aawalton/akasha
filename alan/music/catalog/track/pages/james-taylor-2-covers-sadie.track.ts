import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversSadie = {
  id: "01a0abeb-34ab-7967-a506-8032b6ee2261",
  type: "page-type/track",
  slug: "james-taylor-2-covers-sadie",
  ownLength: 4.580216666666667,
  ownProgress: 4.580216666666667,
  partOfCollections: ["release/james-taylor-2-covers"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sadie",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "sadie|0vn7UBvSQECKJm2817Yf1P|274813",
  song: "song/james-taylor-sadie",
  carriedBy: [
    {
      release: "release/james-taylor-2-covers",
      discNumber: 1,
      position: 9,
      externalId: "0zo20NxWO8ZbcYpwSFykRo",
      externalLink: "https://open.spotify.com/track/0zo20NxWO8ZbcYpwSFykRo",
    },
  ],
} as const satisfies Track
