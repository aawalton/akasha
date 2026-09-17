import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LimitlessPerfect = {
  id: "01a0afa2-0eda-7fbd-8000-0da955a8f5ed",
  type: "page-type/track",
  slug: "the-piano-guys-3-limitless-perfect",
  ownLength: 5.167983333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-limitless"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3WDjj4qNiMlArMHZFt9WyQ",
      externalLink: "https://open.spotify.com/track/3WDjj4qNiMlArMHZFt9WyQ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Perfect",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "perfect|0jW6R8CVyVohuUJVcuweDI|310079",
} as const satisfies Track
