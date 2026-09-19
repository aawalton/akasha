import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenForgiven = {
  id: "01a0b4c8-4a91-7eb4-b83c-864ee03cd09d",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-forgiven",
  ownLength: 4.3511,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "742TUmraj0VL8O8eKM5Umm",
      externalLink: "https://open.spotify.com/track/742TUmraj0VL8O8eKM5Umm",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Forgiven",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "forgiven|7FQRbf8gbKw8KZQZAJWxH2|261066",
  song: "song/paul-cardall-forgiven",
} as const satisfies Track
