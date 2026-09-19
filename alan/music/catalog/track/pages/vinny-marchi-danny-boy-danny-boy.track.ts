import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiDannyBoyDannyBoy = {
  id: "01a0b112-9a78-772d-8c4e-aa9ae8d9a53c",
  type: "page-type/track",
  slug: "vinny-marchi-danny-boy-danny-boy",
  ownLength: 2.997516666666667,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-danny-boy"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2xWqyjYrRSTnuL2gd6Mp56",
      externalLink: "https://open.spotify.com/track/2xWqyjYrRSTnuL2gd6Mp56",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Danny Boy",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "dannyboy|5USAMqcbMAzF3HBmeD5pJF|179851",
  song: "song/vinny-marchi-danny-boy",
} as const satisfies Track
