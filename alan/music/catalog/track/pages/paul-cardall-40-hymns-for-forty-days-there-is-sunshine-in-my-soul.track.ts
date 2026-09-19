import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForFortyDaysThereIsSunshineInMySoul = {
  id: "01a0b4c8-37d0-7acc-a212-51c4639c8c43",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-forty-days-there-is-sunshine-in-my-soul",
  ownLength: 3.1551,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-forty-days"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5dfFDyvrkAIZHS78ztPcHS",
      externalLink: "https://open.spotify.com/track/5dfFDyvrkAIZHS78ztPcHS",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "There Is Sunshine in My Soul",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thereissunshineinmysoul|7FQRbf8gbKw8KZQZAJWxH2|189306",
  song: "song/paul-cardall-there-is-sunshine-in-my-soul",
} as const satisfies Track
