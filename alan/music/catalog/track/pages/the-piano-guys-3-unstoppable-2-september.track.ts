import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3Unstoppable2September = {
  id: "01a0afa1-db71-7fee-883b-bb53ae95ed44",
  type: "page-type/track",
  slug: "the-piano-guys-3-unstoppable-2-september",
  ownLength: 3.4138333333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-unstoppable-2"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4sQ47Yy9Pm7C3HPeIFO2iA",
      externalLink: "https://open.spotify.com/track/4sQ47Yy9Pm7C3HPeIFO2iA",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "September",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "september|0jW6R8CVyVohuUJVcuweDI|204830",
  song: "song/the-piano-guys-september",
} as const satisfies Track
