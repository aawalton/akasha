import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsDemonsDemonsAcousticLiveInLondon = {
  id: "01a0c43f-e28e-7ee3-8598-e7f6f4ff4ae2",
  type: "page-type/track",
  slug: "imagine-dragons-demons-demons-acoustic-live-in-london",
  ownLength: 3.129766666666667,
  ownProgress: 3.129766666666667,
  partOfCollections: ["release/imagine-dragons-demons"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "744NOOjzsy9kSxh2HimEBk",
      externalLink: "https://open.spotify.com/track/744NOOjzsy9kSxh2HimEBk",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Demons - Acoustic Live In London",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "demonsacousticliveinlondon|53XhwfbYqKCa1cC15pYq2q|187786",
  song: "song/imagine-dragons-demons",
  carriedBy: [
    {
      release: "release/imagine-dragons-demons",
      discNumber: 1,
      position: 3,
      externalId: "744NOOjzsy9kSxh2HimEBk",
      externalLink: "https://open.spotify.com/track/744NOOjzsy9kSxh2HimEBk",
    },
  ],
} as const satisfies Track
