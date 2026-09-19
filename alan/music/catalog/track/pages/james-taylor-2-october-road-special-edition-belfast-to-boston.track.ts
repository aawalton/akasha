import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2OctoberRoadSpecialEditionBelfastToBoston = {
  id: "01a0abeb-384e-7bba-800e-f6381ad26c23",
  type: "page-type/track",
  slug: "james-taylor-2-october-road-special-edition-belfast-to-boston",
  ownLength: 4.260666666666666,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-october-road-special-edition"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Xvy3CAs2B4cuV6UvKq8Ke",
      externalLink: "https://open.spotify.com/track/1Xvy3CAs2B4cuV6UvKq8Ke",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Belfast To Boston",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "belfasttoboston|0vn7UBvSQECKJm2817Yf1P|255640",
  song: "song/james-taylor-belfast-to-boston",
} as const satisfies Track
