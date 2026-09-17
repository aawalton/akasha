import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiMissingMeMissingMe = {
  id: "01a0b112-9c16-7f3d-a2ce-6467899884ac",
  type: "page-type/track",
  slug: "vinny-marchi-missing-me-missing-me",
  ownLength: 3.308666666666667,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-missing-me"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4SVHyFLX8rWfmW8nnUzymu",
      externalLink: "https://open.spotify.com/track/4SVHyFLX8rWfmW8nnUzymu",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "missing me.",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "missingme|5USAMqcbMAzF3HBmeD5pJF|198520",
} as const satisfies Track
