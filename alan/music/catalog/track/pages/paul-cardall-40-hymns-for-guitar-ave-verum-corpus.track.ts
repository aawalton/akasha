import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarAveVerumCorpus = {
  id: "01a0b4c8-1c09-7e55-a5fc-e6786f2015f5",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-ave-verum-corpus",
  ownLength: 2.5486166666666668,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 27,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ItK9HfNGVzMYjXNJPXK0n",
      externalLink: "https://open.spotify.com/track/3ItK9HfNGVzMYjXNJPXK0n",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Ave Verum Corpus",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "aveverumcorpus|7FQRbf8gbKw8KZQZAJWxH2|152917",
  song: "song/paul-cardall-ave-verum-corpus",
} as const satisfies Track
