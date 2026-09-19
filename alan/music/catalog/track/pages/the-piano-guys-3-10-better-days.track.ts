import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310BetterDays = {
  id: "01a0afa2-0bbe-79f7-a9fc-386ba69e5bee",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-better-days",
  ownLength: 3.1733333333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4DfvhohdE4RnYHYkhy8mUU",
      externalLink: "https://open.spotify.com/track/4DfvhohdE4RnYHYkhy8mUU",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Better Days",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "betterdays|0jW6R8CVyVohuUJVcuweDI|190400",
  song: "song/the-piano-guys-better-days",
} as const satisfies Track
