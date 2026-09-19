import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenTwinkleLittleStar = {
  id: "01a0b4c8-4c54-7933-8046-d802b335f7c3",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-twinkle-little-star",
  ownLength: 2.340133333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 23,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0zU8NyP59Rrpzlsztw8YXp",
      externalLink: "https://open.spotify.com/track/0zU8NyP59Rrpzlsztw8YXp",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Twinkle Little Star",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "twinklelittlestar|7FQRbf8gbKw8KZQZAJWxH2|140408",
  song: "song/paul-cardall-twinkle-little-star",
} as const satisfies Track
