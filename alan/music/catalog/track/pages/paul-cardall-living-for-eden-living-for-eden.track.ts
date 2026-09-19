import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenLivingForEden = {
  id: "01a0b4c8-49f9-76b7-aabb-15467ece7dc6",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-living-for-eden",
  ownLength: 4.266216666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3GfU6cOW8AzY06ybqifNPL",
      externalLink: "https://open.spotify.com/track/3GfU6cOW8AzY06ybqifNPL",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Living For Eden",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "livingforeden|7FQRbf8gbKw8KZQZAJWxH2|255973",
  song: "song/paul-cardall-living-for-eden",
} as const satisfies Track
