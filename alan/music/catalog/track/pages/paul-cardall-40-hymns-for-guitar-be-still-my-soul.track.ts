import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarBeStillMySoul = {
  id: "01a0b4c8-1b39-78c6-b023-a7418682acd2",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-be-still-my-soul",
  ownLength: 3.1630166666666666,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 21,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4cArim6RNWjmAfAAItwAyn",
      externalLink: "https://open.spotify.com/track/4cArim6RNWjmAfAAItwAyn",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Be Still, My Soul",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "bestillmysoul|7FQRbf8gbKw8KZQZAJWxH2|189781",
  song: "song/paul-cardall-be-still-my-soul",
} as const satisfies Track
