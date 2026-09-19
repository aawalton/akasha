import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPrimaryWorshipILoveToSeeTheTemple = {
  id: "01a0b4c8-55ba-7c52-8752-08993ebfdcc0",
  type: "page-type/track",
  slug: "paul-cardall-primary-worship-i-love-to-see-the-temple",
  ownLength: 4.441766666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-primary-worship"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2nH8J4CrISwwvbZL1pTTdY",
      externalLink: "https://open.spotify.com/track/2nH8J4CrISwwvbZL1pTTdY",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "I Love to See the Temple",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "ilovetoseethetemple|7FQRbf8gbKw8KZQZAJWxH2|266506",
  song: "song/paul-cardall-i-love-to-see-the-temple",
} as const satisfies Track
