import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBushwickBelleHowCanI = {
  id: "01a0b112-8e9c-7b25-a72f-3f54656fced4",
  type: "page-type/track",
  slug: "vinny-marchi-bushwick-belle-how-can-i",
  ownLength: 3.62075,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-bushwick-belle"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1S0hRMjVT6DX9xJEvBF66x",
      externalLink: "https://open.spotify.com/track/1S0hRMjVT6DX9xJEvBF66x",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "How Can I",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "howcani|5USAMqcbMAzF3HBmeD5pJF|217245",
  song: "song/vinny-marchi-how-can-i",
} as const satisfies Track
