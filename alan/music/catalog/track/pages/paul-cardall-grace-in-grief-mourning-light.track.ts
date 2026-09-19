import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallGraceInGriefMourningLight = {
  id: "01a0b4c8-25ca-7826-aa3e-f3343321ea3b",
  type: "page-type/track",
  slug: "paul-cardall-grace-in-grief-mourning-light",
  ownLength: 3.85,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-grace-in-grief"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "072NDoeUR97KLlyuMY0z0S",
      externalLink: "https://open.spotify.com/track/072NDoeUR97KLlyuMY0z0S",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Mourning Light",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "mourninglight|7FQRbf8gbKw8KZQZAJWxH2|231000",
  song: "song/paul-cardall-mourning-light",
} as const satisfies Track
