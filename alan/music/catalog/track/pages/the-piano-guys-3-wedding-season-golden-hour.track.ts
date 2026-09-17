import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WeddingSeasonGoldenHour = {
  id: "01a0afa1-d661-7ee7-b2d6-2d502067326e",
  type: "page-type/track",
  slug: "the-piano-guys-3-wedding-season-golden-hour",
  ownLength: 2.64285,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wedding-season"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7EqrwwLJY9j86l8bvbUStd",
      externalLink: "https://open.spotify.com/track/7EqrwwLJY9j86l8bvbUStd",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Golden Hour",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "goldenhour|0jW6R8CVyVohuUJVcuweDI|158571",
} as const satisfies Track
