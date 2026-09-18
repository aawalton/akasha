import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAscensusAscensusChristiAPianoRhapsody = {
  id: "01a0b4c8-23b3-7227-8c02-636f958ae3b8",
  type: "page-type/track",
  slug: "paul-cardall-ascensus-ascensus-christi-a-piano-rhapsody",
  ownLength: 5.2,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-ascensus"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4bFitzaPCnxXLCLorERvBk",
      externalLink: "https://open.spotify.com/track/4bFitzaPCnxXLCLorERvBk",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Ascensus Christi: A Piano Rhapsody",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "ascensuschristiapianorhapsody|7FQRbf8gbKw8KZQZAJWxH2|312000",
} as const satisfies Track
