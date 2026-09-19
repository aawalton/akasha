import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoLiveToLove = {
  id: "01a0b4c8-4711-7c33-b15a-163aee655ce8",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-live-to-love",
  ownLength: 3.537333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3LL4bs5JQ508unAk97UYpi",
      externalLink: "https://open.spotify.com/track/3LL4bs5JQ508unAk97UYpi",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Live to Love",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "livetolove|7FQRbf8gbKw8KZQZAJWxH2|212240",
  song: "song/paul-cardall-live-to-love",
} as const satisfies Track
