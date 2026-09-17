import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3GhostRainyDayWaltz = {
  id: "01a0afa1-fbec-7c17-9f71-242d647aaefb",
  type: "page-type/track",
  slug: "the-piano-guys-3-ghost-rainy-day-waltz",
  ownLength: 3.7321166666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-ghost"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "59ihFAedQDTHRbpzSZRr7f",
      externalLink: "https://open.spotify.com/track/59ihFAedQDTHRbpzSZRr7f",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Rainy Day Waltz",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "rainydaywaltz|0jW6R8CVyVohuUJVcuweDI|223927",
} as const satisfies Track
