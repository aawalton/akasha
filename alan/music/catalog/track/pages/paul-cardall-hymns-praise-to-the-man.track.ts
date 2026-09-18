import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsPraiseToTheMan = {
  id: "01a0b4c8-63f1-76aa-8258-9d178ce54eed",
  type: "page-type/track",
  slug: "paul-cardall-hymns-praise-to-the-man",
  ownLength: 2.1791,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-hymns"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5vQUtnNhqzycW7dnbcRAWR",
      externalLink: "https://open.spotify.com/track/5vQUtnNhqzycW7dnbcRAWR",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Praise To The Man",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "praisetotheman|7FQRbf8gbKw8KZQZAJWxH2|130746",
} as const satisfies Track
