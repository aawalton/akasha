import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsOMyFather = {
  id: "01a0b4c8-632a-7310-b5eb-79d545aafa6c",
  type: "page-type/track",
  slug: "paul-cardall-hymns-o-my-father",
  ownLength: 2.156,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-hymns"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3pZ3HrAn1Zwr33JnohXW1i",
      externalLink: "https://open.spotify.com/track/3pZ3HrAn1Zwr33JnohXW1i",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "O My Father",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "omyfather|7FQRbf8gbKw8KZQZAJWxH2|129360",
  song: "song/paul-cardall-o-my-father",
} as const satisfies Track
