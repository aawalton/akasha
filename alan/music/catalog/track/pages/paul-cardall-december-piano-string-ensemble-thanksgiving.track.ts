import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberPianoStringEnsembleThanksgiving = {
  id: "01a0b4c8-2d6e-752d-b602-8f6690095aa6",
  type: "page-type/track",
  slug: "paul-cardall-december-piano-string-ensemble-thanksgiving",
  ownLength: 2.35955,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-december-piano-string-ensemble"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4j4mk3j6IgNaEWodidrfle",
      externalLink: "https://open.spotify.com/track/4j4mk3j6IgNaEWodidrfle",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Thanksgiving",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thanksgiving|7FQRbf8gbKw8KZQZAJWxH2|141573",
  song: "song/paul-cardall-thanksgiving",
} as const satisfies Track
