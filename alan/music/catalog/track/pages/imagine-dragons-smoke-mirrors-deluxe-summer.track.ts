import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsDeluxeSummer = {
  id: "01a0c43f-d083-7ff4-96de-321ea2aaf05e",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-deluxe-summer",
  ownLength: 3.638,
  ownProgress: 3.638,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors-deluxe"],
  position: 11,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5dvDAORqUH5xoO8bfv0hlG",
      externalLink: "https://open.spotify.com/track/5dvDAORqUH5xoO8bfv0hlG",
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
      release: "release/imagine-dragons-smoke-mirrors-deluxe",
      discNumber: 1,
      position: 11,
      externalId: "5dvDAORqUH5xoO8bfv0hlG",
      externalLink: "https://open.spotify.com/track/5dvDAORqUH5xoO8bfv0hlG",
    },
  ],
} as const satisfies Track
