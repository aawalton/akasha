import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JtIWasOnlyTellingALie = {
  id: "01a0abeb-46a9-7a61-ae78-caca9b857200",
  type: "page-type/track",
  slug: "james-taylor-2-jt-i-was-only-telling-a-lie",
  ownLength: 3.417116666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-jt"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1o8KPosoFJDZseZwCVKSqj",
      externalLink: "https://open.spotify.com/track/1o8KPosoFJDZseZwCVKSqj",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "I Was Only Telling a Lie",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "iwasonlytellingalie|0vn7UBvSQECKJm2817Yf1P|205027",
  song: "song/james-taylor-i-was-only-telling-a-lie",
} as const satisfies Track
