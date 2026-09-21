import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberPianoStringEnsembleLeavingNazareth = {
  id: "01a0b4c8-2db9-7a11-9ec0-cd3937a5e48f",
  type: "page-type/track",
  slug: "paul-cardall-december-piano-string-ensemble-leaving-nazareth",
  ownLength: 3.9282166666666667,
  ownProgress: 3.9282166666666667,
  partOfCollections: ["release/paul-cardall-december-piano-string-ensemble"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1xfzsax2zFvxLK0US4qi7D",
      externalLink: "https://open.spotify.com/track/1xfzsax2zFvxLK0US4qi7D",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Leaving Nazareth",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "leavingnazareth|7FQRbf8gbKw8KZQZAJWxH2|235693",
  song: "song/paul-cardall-leaving-nazareth",
  carriedBy: [
    {
      release: "release/paul-cardall-december-piano-string-ensemble",
      discNumber: 1,
      position: 8,
      externalId: "1xfzsax2zFvxLK0US4qi7D",
      externalLink: "https://open.spotify.com/track/1xfzsax2zFvxLK0US4qi7D",
    },
  ],
} as const satisfies Track
