import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenReturnToEden = {
  id: "01a0b4c8-4add-7131-88f3-9ab08a8ac552",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-return-to-eden",
  ownLength: 3.5657666666666668,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Usvxr0uLh0taMdOuMTJPs",
      externalLink: "https://open.spotify.com/track/5Usvxr0uLh0taMdOuMTJPs",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Return To Eden",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "returntoeden|7FQRbf8gbKw8KZQZAJWxH2|213946",
  song: "song/paul-cardall-return-to-eden",
} as const satisfies Track
