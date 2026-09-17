import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3GoldenHourGoldenHour = {
  id: "01a0afa1-fa2f-7a64-9a5b-b1c9d509bfaa",
  type: "page-type/track",
  slug: "the-piano-guys-3-golden-hour-golden-hour",
  ownLength: 2.64285,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-golden-hour"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0VdOSX69YUIIYMQWnGSlC2",
      externalLink: "https://open.spotify.com/track/0VdOSX69YUIIYMQWnGSlC2",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Golden Hour",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "goldenhour|0jW6R8CVyVohuUJVcuweDI|158571",
} as const satisfies Track
