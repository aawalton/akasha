import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoDeepWaters = {
  id: "01a0b4c8-31a4-7538-a2e8-4493edb0472d",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-deep-waters",
  ownLength: 3.4191,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Wjgkn2ccF4Fm0Pe1Q5gb3",
      externalLink: "https://open.spotify.com/track/4Wjgkn2ccF4Fm0Pe1Q5gb3",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Deep Waters",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "deepwaters|7FQRbf8gbKw8KZQZAJWxH2|205146",
  song: "song/paul-cardall-deep-waters",
} as const satisfies Track
