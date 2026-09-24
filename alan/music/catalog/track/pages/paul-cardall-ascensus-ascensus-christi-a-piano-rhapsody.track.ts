import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAscensusAscensusChristiAPianoRhapsody = {
  id: "01a0b4c8-23b3-7227-8c02-636f958ae3b8",
  type: "page-type/track",
  slug: "paul-cardall-ascensus-ascensus-christi-a-piano-rhapsody",
  ownLength: 5.2,
  ownProgress: 5.2,
  partOfCollections: ["release/paul-cardall-ascensus"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ascensus Christi: A Piano Rhapsody",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "ascensuschristiapianorhapsody|7FQRbf8gbKw8KZQZAJWxH2|312000",
  song: "song/paul-cardall-ascensus-christi-a-piano-rhapsody",
  carriedBy: [
    {
      release: "release/paul-cardall-ascensus",
      discNumber: 1,
      position: 2,
      externalId: "4bFitzaPCnxXLCLorERvBk",
      externalLink: "https://open.spotify.com/track/4bFitzaPCnxXLCLorERvBk",
    },
  ],
} as const satisfies Track
