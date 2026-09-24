import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenSweetHourOfPrayer = {
  id: "01a0b4c8-4c31-744f-b06c-0c9d25116ade",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-sweet-hour-of-prayer",
  ownLength: 3.1856166666666668,
  ownProgress: 3.1856166666666668,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sweet Hour Of Prayer",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "sweethourofprayer|7FQRbf8gbKw8KZQZAJWxH2|191137",
  song: "song/paul-cardall-sweet-hour-of-prayer",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 22,
      externalId: "6TAj9AlhfJHud6rYIcvaJY",
      externalLink: "https://open.spotify.com/track/6TAj9AlhfJHud6rYIcvaJY",
    },
  ],
} as const satisfies Track
