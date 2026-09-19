import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSoldierPoetKingSoldierPoetKing = {
  id: "01a0b112-9996-70a9-abb7-911a4c948fd3",
  type: "page-type/track",
  slug: "vinny-marchi-soldier-poet-king-soldier-poet-king",
  ownLength: 2.8037666666666667,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-soldier-poet-king"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "37LtlWBxtMrNLoAFJYIc23",
      externalLink: "https://open.spotify.com/track/37LtlWBxtMrNLoAFJYIc23",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Soldier, Poet, King",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "soldierpoetking|5USAMqcbMAzF3HBmeD5pJF|168226",
  song: "song/vinny-marchi-soldier-poet-king",
} as const satisfies Track
