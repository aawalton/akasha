import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheHymnsCollection2DiscSetOMyFather = {
  id: "01a0b4c8-4d6a-763f-9663-40de33051353",
  type: "page-type/track",
  slug: "paul-cardall-the-hymns-collection-2-disc-set-o-my-father",
  ownLength: 2.1899166666666665,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-hymns-collection-2-disc-set"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0IgBEqb4QJAVHWfUTgEoSI",
      externalLink: "https://open.spotify.com/track/0IgBEqb4QJAVHWfUTgEoSI",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "O My Father",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "omyfather|7FQRbf8gbKw8KZQZAJWxH2|131395",
  song: "song/paul-cardall-o-my-father",
} as const satisfies Track
