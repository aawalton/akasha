import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPrimaryWorshipBookOfMormonStories = {
  id: "01a0b4c8-5696-7f44-98df-e1bc30422563",
  type: "page-type/track",
  slug: "paul-cardall-primary-worship-book-of-mormon-stories",
  ownLength: 6.788883333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-primary-worship"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "55taYRw24dlfSN7MU7ErH2",
      externalLink: "https://open.spotify.com/track/55taYRw24dlfSN7MU7ErH2",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Book of Mormon Stories",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "bookofmormonstories|7FQRbf8gbKw8KZQZAJWxH2|407333",
  song: "song/paul-cardall-book-of-mormon-stories",
} as const satisfies Track
