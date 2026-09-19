import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sylviaDaleyTwinkleTwinkleTwinkleTwinkle = {
  id: "01a0a6c3-6b79-7027-be94-ac37d28baac4",
  type: "page-type/track",
  slug: "sylvia-daley-twinkle-twinkle-twinkle-twinkle",
  ownLength: 2.4285666666666668,
  ownProgress: 0,
  partOfCollections: ["release/sylvia-daley-twinkle-twinkle"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1NWlqbpa8Ia1kcDEOLUrx8",
      externalLink: "https://open.spotify.com/track/1NWlqbpa8Ia1kcDEOLUrx8",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Twinkle Twinkle",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "03dXd2zBbBJvX60Oap8Lgo", artistName: "Sylvia Daley" }],
  trackKey: "twinkletwinkle|03dXd2zBbBJvX60Oap8Lgo|145714",
  song: "song/sylvia-daley-twinkle-twinkle",
} as const satisfies Track
