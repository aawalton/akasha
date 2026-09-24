import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversSeminoleWind = {
  id: "01a0abeb-344b-7dc6-8395-94807fe9427a",
  type: "page-type/track",
  slug: "james-taylor-2-covers-seminole-wind",
  ownLength: 4.834433333333333,
  ownProgress: 4.834433333333333,
  partOfCollections: ["release/james-taylor-2-covers"],
  status: "completed",
  unit: "unit/minutes",
  title: "Seminole Wind",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "seminolewind|0vn7UBvSQECKJm2817Yf1P|290066",
  song: "song/james-taylor-seminole-wind",
  carriedBy: [
    {
      release: "release/james-taylor-2-covers",
      discNumber: 1,
      position: 6,
      externalId: "0uI444jTIkIFECHgc5LAEY",
      externalLink: "https://open.spotify.com/track/0uI444jTIkIFECHgc5LAEY",
    },
  ],
} as const satisfies Track
