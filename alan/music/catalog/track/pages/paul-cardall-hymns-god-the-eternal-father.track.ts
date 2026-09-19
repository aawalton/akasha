import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsGodTheEternalFather = {
  id: "01a0b4c8-625f-7e03-8c62-0d031b577854",
  type: "page-type/track",
  slug: "paul-cardall-hymns-god-the-eternal-father",
  ownLength: 2.6086666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-hymns"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4I1uJTHsyMZ2dbdZD4A4nJ",
      externalLink: "https://open.spotify.com/track/4I1uJTHsyMZ2dbdZD4A4nJ",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "God, The Eternal Father",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "godtheeternalfather|7FQRbf8gbKw8KZQZAJWxH2|156520",
  song: "song/paul-cardall-god-the-eternal-father",
} as const satisfies Track
