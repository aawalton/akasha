import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveSweetBabyJames = {
  id: "01a0abeb-3bbe-7fd7-8f14-ffc350ba8ff3",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-sweet-baby-james",
  ownLength: 4.18955,
  ownProgress: 4.18955,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sweet Baby James",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "sweetbabyjames|0vn7UBvSQECKJm2817Yf1P|251373",
  song: "song/james-taylor-sweet-baby-james",
  carriedBy: [
    {
      release: "release/james-taylor-2-james-taylor-live",
      discNumber: 1,
      position: 1,
      externalId: "6sMFBGi63uil2HDqUEpCq3",
      externalLink: "https://open.spotify.com/track/6sMFBGi63uil2HDqUEpCq3",
    },
  ],
} as const satisfies Track
