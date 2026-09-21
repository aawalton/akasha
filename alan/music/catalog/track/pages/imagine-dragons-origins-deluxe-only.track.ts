import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsOriginsDeluxeOnly = {
  id: "01a0c43f-c8d5-72b7-a798-dd36e37d6969",
  type: "page-type/track",
  slug: "imagine-dragons-origins-deluxe-only",
  ownLength: 3.0122166666666668,
  ownProgress: 3.0122166666666668,
  partOfCollections: ["release/imagine-dragons-origins-deluxe"],
  position: 10,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1uRBbjQ3uNFXCncWyNomHf",
      externalLink: "https://open.spotify.com/track/1uRBbjQ3uNFXCncWyNomHf",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Only",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "only|53XhwfbYqKCa1cC15pYq2q|180733",
  song: "song/imagine-dragons-only",
} as const satisfies Track
