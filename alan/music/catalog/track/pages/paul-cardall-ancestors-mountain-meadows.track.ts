import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAncestorsMountainMeadows = {
  id: "01a0b4c8-1f13-7772-8096-8cb8029069d9",
  type: "page-type/track",
  slug: "paul-cardall-ancestors-mountain-meadows",
  ownLength: 4.468,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-ancestors"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7CCB6ro1J0M2slGILexluE",
      externalLink: "https://open.spotify.com/track/7CCB6ro1J0M2slGILexluE",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Mountain Meadows",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "mountainmeadows|7FQRbf8gbKw8KZQZAJWxH2|268080",
  song: "song/paul-cardall-mountain-meadows",
} as const satisfies Track
