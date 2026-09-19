import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoANewBeginning = {
  id: "01a0b4c8-3163-79d9-ac4f-8b360fd4ebfb",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-a-new-beginning",
  ownLength: 4.1128833333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4rgjrRYSPna5mr7aautSTJ",
      externalLink: "https://open.spotify.com/track/4rgjrRYSPna5mr7aautSTJ",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "A New Beginning",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "anewbeginning|7FQRbf8gbKw8KZQZAJWxH2|246773",
  song: "song/paul-cardall-a-new-beginning",
} as const satisfies Track
