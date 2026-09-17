import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiISeeFireISeeFire = {
  id: "01a0b112-96d5-7dae-92df-1eb38f7914c3",
  type: "page-type/track",
  slug: "vinny-marchi-i-see-fire-i-see-fire",
  ownLength: 3.8908833333333335,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-i-see-fire"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2eqMCwauppMk6KPj66Mv8l",
      externalLink: "https://open.spotify.com/track/2eqMCwauppMk6KPj66Mv8l",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "I See Fire",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" },
    { externalId: "0ZM2ioGGBOZ3NPTSUbuimj", artistName: "Bobby Bass" },
  ],
  trackKey: "iseefire|0ZM2ioGGBOZ3NPTSUbuimj,5USAMqcbMAzF3HBmeD5pJF|233453",
} as const satisfies Track
