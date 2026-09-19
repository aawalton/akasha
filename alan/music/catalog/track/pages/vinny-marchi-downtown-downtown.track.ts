import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiDowntownDowntown = {
  id: "01a0b112-905f-76b9-9667-157a4d0d3f62",
  type: "page-type/track",
  slug: "vinny-marchi-downtown-downtown",
  ownLength: 3.4022833333333335,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-downtown"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1awHjw2GZ9nkdDvHsbhB4g",
      externalLink: "https://open.spotify.com/track/1awHjw2GZ9nkdDvHsbhB4g",
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
