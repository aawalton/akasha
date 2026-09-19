import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoWhereYouThere = {
  id: "01a0b4c8-47f3-7fa4-a832-dde5683cc184",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-where-you-there",
  ownLength: 5.258216666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Aa8vLcIfoAJikT1QVrAbY",
      externalLink: "https://open.spotify.com/track/6Aa8vLcIfoAJikT1QVrAbY",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Where You There?",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "whereyouthere|7FQRbf8gbKw8KZQZAJWxH2|315493",
  song: "song/paul-cardall-where-you-there",
} as const satisfies Track
