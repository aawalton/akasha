import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSongsOfPraiseEden = {
  id: "01a0b4c8-525a-7e15-a2fe-648ea71ad7ad",
  type: "page-type/track",
  slug: "paul-cardall-songs-of-praise-eden",
  ownLength: 3.4311,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-songs-of-praise"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4gP6Z909MxyzJH7SxxxWfV",
      externalLink: "https://open.spotify.com/track/4gP6Z909MxyzJH7SxxxWfV",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Eden",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "eden|7FQRbf8gbKw8KZQZAJWxH2|205866",
} as const satisfies Track
