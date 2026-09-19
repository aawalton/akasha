import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsFutureMe = {
  id: "01a0b112-9363-7dda-91b6-eb6dfe192469",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-future-me",
  ownLength: 3.34375,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "63Q6vuZWEOvu1oIVOB6BJH",
      externalLink: "https://open.spotify.com/track/63Q6vuZWEOvu1oIVOB6BJH",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "future me",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "futureme|5USAMqcbMAzF3HBmeD5pJF|200625",
  song: "song/vinny-marchi-future-me",
} as const satisfies Track
