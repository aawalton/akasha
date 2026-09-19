import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBushwickBelle2016 = {
  id: "01a0b112-8f96-7bdc-9f82-d5e89f43b2f3",
  type: "page-type/track",
  slug: "vinny-marchi-bushwick-belle-2016",
  ownLength: 2.714383333333333,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-bushwick-belle"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "40pu6T8KJPyleaSNT8IU3s",
      externalLink: "https://open.spotify.com/track/40pu6T8KJPyleaSNT8IU3s",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "2016",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "2016|5USAMqcbMAzF3HBmeD5pJF|162863",
  song: "song/vinny-marchi-2016",
} as const satisfies Track
