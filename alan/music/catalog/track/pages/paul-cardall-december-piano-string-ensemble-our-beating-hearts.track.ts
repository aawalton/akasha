import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberPianoStringEnsembleOurBeatingHearts = {
  id: "01a0b4c8-2e70-7946-810b-b88cf1e67a0b",
  type: "page-type/track",
  slug: "paul-cardall-december-piano-string-ensemble-our-beating-hearts",
  ownLength: 3.4697666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-december-piano-string-ensemble"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4siXWKENmt0nQxe6AJuoup",
      externalLink: "https://open.spotify.com/track/4siXWKENmt0nQxe6AJuoup",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Our Beating Hearts",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "ourbeatinghearts|7FQRbf8gbKw8KZQZAJWxH2|208186",
  song: "song/paul-cardall-our-beating-hearts",
} as const satisfies Track
