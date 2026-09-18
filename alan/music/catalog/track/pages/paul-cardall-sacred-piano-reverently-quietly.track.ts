import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoReverentlyQuietly = {
  id: "01a0b4c8-48e4-79f6-8310-ae361976f5a3",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-reverently-quietly",
  ownLength: 3.15355,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2lphskZNhDQLdfid5Le2Gm",
      externalLink: "https://open.spotify.com/track/2lphskZNhDQLdfid5Le2Gm",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Reverently, Quietly",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "reverentlyquietly|7FQRbf8gbKw8KZQZAJWxH2|189213",
} as const satisfies Track
