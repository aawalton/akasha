import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenTwinkleLittleStar = {
  id: "01a0b4c8-4c54-7933-8046-d802b335f7c3",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-twinkle-little-star",
  ownLength: 2.340133333333333,
  ownProgress: 2.340133333333333,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  status: "completed",
  unit: "unit/minutes",
  title: "Twinkle Little Star",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "twinklelittlestar|7FQRbf8gbKw8KZQZAJWxH2|140408",
  song: "song/paul-cardall-twinkle-little-star",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 23,
      externalId: "0zU8NyP59Rrpzlsztw8YXp",
      externalLink: "https://open.spotify.com/track/0zU8NyP59Rrpzlsztw8YXp",
    },
  ],
} as const satisfies Track
