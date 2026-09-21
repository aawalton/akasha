import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsDeluxeRelease = {
  id: "01a0c43f-d16e-7636-a16b-40404a2a4aa0",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-deluxe-release",
  ownLength: 2.47,
  ownProgress: 2.47,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ubpkIvw8SDchaRPEKIQPS",
      externalLink: "https://open.spotify.com/track/3ubpkIvw8SDchaRPEKIQPS",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Release",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "release|53XhwfbYqKCa1cC15pYq2q|148200",
  song: "song/imagine-dragons-release",
  carriedBy: [
    {
      release: "release/imagine-dragons-smoke-mirrors-deluxe",
      discNumber: 1,
      position: 17,
      externalId: "3ubpkIvw8SDchaRPEKIQPS",
      externalLink: "https://open.spotify.com/track/3ubpkIvw8SDchaRPEKIQPS",
    },
  ],
} as const satisfies Track
