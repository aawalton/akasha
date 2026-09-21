import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAscensusAscensusChristiASoloPianoRhapsodyRemix = {
  id: "01a0b4c8-24b2-79b3-8e6d-0cfcc0f38f0f",
  type: "page-type/track",
  slug: "paul-cardall-ascensus-ascensus-christi-a-solo-piano-rhapsody-remix",
  ownLength: 4.1415,
  ownProgress: 4.1415,
  partOfCollections: ["release/paul-cardall-ascensus"],
  position: 9,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5j7N31giBINyYZbr4PBSmp",
      externalLink: "https://open.spotify.com/track/5j7N31giBINyYZbr4PBSmp",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Ascensus Christi: A Solo Piano Rhapsody - Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "ascensuschristiasolopianorhapsodyremix|7FQRbf8gbKw8KZQZAJWxH2|248490",
  song: "song/paul-cardall-ascensus-christi-a-solo-piano-rhapsody",
  carriedBy: [
    {
      release: "release/paul-cardall-ascensus",
      discNumber: 1,
      position: 9,
      externalId: "5j7N31giBINyYZbr4PBSmp",
      externalLink: "https://open.spotify.com/track/5j7N31giBINyYZbr4PBSmp",
    },
  ],
} as const satisfies Track
