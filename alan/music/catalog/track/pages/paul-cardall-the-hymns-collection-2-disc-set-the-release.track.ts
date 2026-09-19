import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheHymnsCollection2DiscSetTheRelease = {
  id: "01a0b4c8-4d8e-798b-9c72-77d7b4acb5d1",
  type: "page-type/track",
  slug: "paul-cardall-the-hymns-collection-2-disc-set-the-release",
  ownLength: 3.4263833333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-hymns-collection-2-disc-set"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6NsEOZqSomT2wcJjoJfJ8V",
      externalLink: "https://open.spotify.com/track/6NsEOZqSomT2wcJjoJfJ8V",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Release",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "therelease|7FQRbf8gbKw8KZQZAJWxH2|205583",
  song: "song/paul-cardall-the-release",
} as const satisfies Track
