import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillJupiter = {
  id: "01a0afa1-e13a-7fab-97bf-7f54ddad18df",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-jupiter",
  ownLength: 3.223883333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-chill"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2IpKKmIudVllzv6NKOtNwq",
      externalLink: "https://open.spotify.com/track/2IpKKmIudVllzv6NKOtNwq",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Jupiter",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "jupiter|0jW6R8CVyVohuUJVcuweDI|193433",
} as const satisfies Track
