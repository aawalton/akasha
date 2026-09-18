import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenOurLove = {
  id: "01a0b4c8-490b-7056-aa18-b312f22c10ba",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-our-love",
  ownLength: 3.86,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1BqSWGmMMuJpNyCSO8Gz1d",
      externalLink: "https://open.spotify.com/track/1BqSWGmMMuJpNyCSO8Gz1d",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Our Love",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "ourlove|7FQRbf8gbKw8KZQZAJWxH2|231600",
} as const satisfies Track
