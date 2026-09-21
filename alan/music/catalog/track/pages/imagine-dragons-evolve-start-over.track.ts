import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsEvolveStartOver = {
  id: "01a0c43f-cb73-7d30-8c0e-6fb32bc87b3c",
  type: "page-type/track",
  slug: "imagine-dragons-evolve-start-over",
  ownLength: 3.1013333333333333,
  ownProgress: 3.1013333333333333,
  partOfCollections: ["release/imagine-dragons-evolve"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Iug43iQrHN8CbGsUd2tEt",
      externalLink: "https://open.spotify.com/track/2Iug43iQrHN8CbGsUd2tEt",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Start Over",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "startover|53XhwfbYqKCa1cC15pYq2q|186080",
  song: "song/imagine-dragons-start-over",
  carriedBy: [
    {
      release: "release/imagine-dragons-evolve",
      discNumber: 1,
      position: 11,
      externalId: "2Iug43iQrHN8CbGsUd2tEt",
      externalLink: "https://open.spotify.com/track/2Iug43iQrHN8CbGsUd2tEt",
    },
  ],
} as const satisfies Track
