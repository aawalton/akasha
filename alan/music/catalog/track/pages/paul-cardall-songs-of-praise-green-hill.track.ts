import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSongsOfPraiseGreenHill = {
  id: "01a0b4c8-5232-7e88-b567-847f582bff80",
  type: "page-type/track",
  slug: "paul-cardall-songs-of-praise-green-hill",
  ownLength: 3.6584333333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-songs-of-praise"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2kGcrMzgmbLLB0z3l2KDqp",
      externalLink: "https://open.spotify.com/track/2kGcrMzgmbLLB0z3l2KDqp",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Green Hill",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "greenhill|7FQRbf8gbKw8KZQZAJWxH2|219506",
  song: "song/paul-cardall-green-hill",
} as const satisfies Track
