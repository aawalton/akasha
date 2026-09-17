import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiHabaneraHabanera = {
  id: "01a0b112-97cb-70df-a04b-483fed1dbb50",
  type: "page-type/track",
  slug: "vinny-marchi-habanera-habanera",
  ownLength: 2.1803833333333333,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-habanera"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0YUjPFQEdInqgaZduX6UwV",
      externalLink: "https://open.spotify.com/track/0YUjPFQEdInqgaZduX6UwV",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Habanera",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "habanera|5USAMqcbMAzF3HBmeD5pJF|130823",
} as const satisfies Track
