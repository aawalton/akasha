import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiIHeardMrRamoneIHeardMrRamone = {
  id: "01a0b112-94aa-72e3-a8e9-7ede2cf5da16",
  type: "page-type/track",
  slug: "vinny-marchi-i-heard-mr-ramone-i-heard-mr-ramone",
  ownLength: 3.50075,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-i-heard-mr-ramone"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "34AuDzMwxmKQmiE9Hm49sX",
      externalLink: "https://open.spotify.com/track/34AuDzMwxmKQmiE9Hm49sX",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "I Heard Mr. Ramone",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "iheardmrramone|5USAMqcbMAzF3HBmeD5pJF|210045",
} as const satisfies Track
