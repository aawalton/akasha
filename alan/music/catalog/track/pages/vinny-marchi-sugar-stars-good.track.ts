import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsGood = {
  id: "01a0b112-9321-77ab-b8b8-2a4f979b71ab",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-good",
  ownLength: 2.4893,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "12XwertpK0Q36AyuHgDA3P",
      externalLink: "https://open.spotify.com/track/12XwertpK0Q36AyuHgDA3P",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "good",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "good|5USAMqcbMAzF3HBmeD5pJF|149358",
} as const satisfies Track
