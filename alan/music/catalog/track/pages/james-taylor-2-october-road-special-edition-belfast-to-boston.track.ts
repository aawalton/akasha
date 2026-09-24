import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2OctoberRoadSpecialEditionBelfastToBoston = {
  id: "01a0abeb-384e-7bba-800e-f6381ad26c23",
  type: "page-type/track",
  slug: "james-taylor-2-october-road-special-edition-belfast-to-boston",
  ownLength: 4.260666666666666,
  ownProgress: 4.260666666666666,
  partOfCollections: ["release/james-taylor-2-october-road-special-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Belfast To Boston",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "belfasttoboston|0vn7UBvSQECKJm2817Yf1P|255640",
  song: "song/james-taylor-belfast-to-boston",
  carriedBy: [
    {
      release: "release/james-taylor-2-october-road-special-edition",
      discNumber: 1,
      position: 5,
      externalId: "1Xvy3CAs2B4cuV6UvKq8Ke",
      externalLink: "https://open.spotify.com/track/1Xvy3CAs2B4cuV6UvKq8Ke",
    },
  ],
} as const satisfies Track
