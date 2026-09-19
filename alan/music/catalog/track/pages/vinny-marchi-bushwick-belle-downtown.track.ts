import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBushwickBelleDowntown = {
  id: "01a0b112-8ec1-79b0-851c-1b04bec41b16",
  type: "page-type/track",
  slug: "vinny-marchi-bushwick-belle-downtown",
  ownLength: 3.4022833333333335,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-bushwick-belle"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4LQKy6ifOt6doOH157akvv",
      externalLink: "https://open.spotify.com/track/4LQKy6ifOt6doOH157akvv",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Downtown",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "downtown|5USAMqcbMAzF3HBmeD5pJF|204137",
  song: "song/vinny-marchi-downtown",
} as const satisfies Track
