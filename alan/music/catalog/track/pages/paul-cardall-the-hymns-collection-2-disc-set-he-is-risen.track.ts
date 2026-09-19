import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheHymnsCollection2DiscSetHeIsRisen = {
  id: "01a0b4c8-4e4f-7dc1-a83d-623ff5d55518",
  type: "page-type/track",
  slug: "paul-cardall-the-hymns-collection-2-disc-set-he-is-risen",
  ownLength: 2.6231166666666668,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-hymns-collection-2-disc-set"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1cP0r2E7ers7leP6gMD9yR",
      externalLink: "https://open.spotify.com/track/1cP0r2E7ers7leP6gMD9yR",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "He Is Risen",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "heisrisen|7FQRbf8gbKw8KZQZAJWxH2|157387",
  song: "song/paul-cardall-he-is-risen",
} as const satisfies Track
