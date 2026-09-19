import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPeacefulPianoDanceOfTheLiving = {
  id: "01a0b4c8-3343-7987-bc72-94d0200e926d",
  type: "page-type/track",
  slug: "paul-cardall-peaceful-piano-dance-of-the-living",
  ownLength: 3.5877666666666665,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-peaceful-piano"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4CufJg21ZFLZwGYmik66nE",
      externalLink: "https://open.spotify.com/track/4CufJg21ZFLZwGYmik66nE",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Dance of the Living",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "danceoftheliving|7FQRbf8gbKw8KZQZAJWxH2|215266",
  song: "song/paul-cardall-dance-of-the-living",
} as const satisfies Track
