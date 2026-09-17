import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WondersLetItGo = {
  id: "01a0afa2-15ba-7828-9b99-9e6eea0f6ab9",
  type: "page-type/track",
  slug: "the-piano-guys-3-wonders-let-it-go",
  ownLength: 4.030666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wonders"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1wpyVNJcutD5uYyjDreWaW",
      externalLink: "https://open.spotify.com/track/1wpyVNJcutD5uYyjDreWaW",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Let It Go",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "letitgo|0jW6R8CVyVohuUJVcuweDI|241840",
} as const satisfies Track
