import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsSummer = {
  id: "01a0c43f-d3d6-7b37-8903-0b985773a01a",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-summer",
  ownLength: 3.638,
  ownProgress: 3.638,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors"],
  position: 11,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0TrvmvJngRUlCaBtt8VPRs",
      externalLink: "https://open.spotify.com/track/0TrvmvJngRUlCaBtt8VPRs",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Summer",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "summer|53XhwfbYqKCa1cC15pYq2q|218280",
  song: "song/imagine-dragons-summer",
  carriedBy: [
    {
      release: "release/imagine-dragons-smoke-mirrors",
      discNumber: 1,
      position: 11,
      externalId: "0TrvmvJngRUlCaBtt8VPRs",
      externalLink: "https://open.spotify.com/track/0TrvmvJngRUlCaBtt8VPRs",
    },
  ],
} as const satisfies Track
