import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBushwickBelleIHeardMrRamone = {
  id: "01a0b112-8f2c-70c8-8370-e560efb41da5",
  type: "page-type/track",
  slug: "vinny-marchi-bushwick-belle-i-heard-mr-ramone",
  ownLength: 3.5170833333333333,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-bushwick-belle"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "69ovIJT5vlgHuG33UWWfiB",
      externalLink: "https://open.spotify.com/track/69ovIJT5vlgHuG33UWWfiB",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "I Heard Mr. Ramone",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "iheardmrramone|5USAMqcbMAzF3HBmeD5pJF|211025",
} as const satisfies Track
