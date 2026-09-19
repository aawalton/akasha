import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiLyingHereAloneLyingHereAlone = {
  id: "01a0b112-99e0-77d3-b444-fb2157c283ff",
  type: "page-type/track",
  slug: "vinny-marchi-lying-here-alone-lying-here-alone",
  ownLength: 2.67385,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-lying-here-alone"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3EX5oNwHXuXY3VTJqSbXBs",
      externalLink: "https://open.spotify.com/track/3EX5oNwHXuXY3VTJqSbXBs",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "LYING HERE ALONE",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "lyingherealone|5USAMqcbMAzF3HBmeD5pJF|160431",
  song: "song/vinny-marchi-lying-here-alone",
} as const satisfies Track
