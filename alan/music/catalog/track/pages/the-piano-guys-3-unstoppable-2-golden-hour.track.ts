import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3Unstoppable2GoldenHour = {
  id: "01a0afa1-db94-7fe7-b638-ec766483b884",
  type: "page-type/track",
  slug: "the-piano-guys-3-unstoppable-2-golden-hour",
  ownLength: 2.64285,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-unstoppable-2"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "73O7rPlJqpxAevXk7aWrTH",
      externalLink: "https://open.spotify.com/track/73O7rPlJqpxAevXk7aWrTH",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Golden Hour",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "goldenhour|0jW6R8CVyVohuUJVcuweDI|158571",
} as const satisfies Track
