import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3GhostSeptember = {
  id: "01a0afa1-fc0c-78f9-ac4e-f2f5abdeb265",
  type: "page-type/track",
  slug: "the-piano-guys-3-ghost-september",
  ownLength: 3.4138333333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-ghost"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3YhMQUrVVeuTNHfl3nI5QF",
      externalLink: "https://open.spotify.com/track/3YhMQUrVVeuTNHfl3nI5QF",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "September",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "september|0jW6R8CVyVohuUJVcuweDI|204830",
} as const satisfies Track
