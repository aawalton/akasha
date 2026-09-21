import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsDream = {
  id: "01a0c43f-d382-78f9-9cf1-4e19dad607f8",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-dream",
  ownLength: 4.3,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "25DpvTS4zsmLiVLx8Zv3N0",
      externalLink: "https://open.spotify.com/track/25DpvTS4zsmLiVLx8Zv3N0",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Dream",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "dream|53XhwfbYqKCa1cC15pYq2q|258000",
  song: "song/imagine-dragons-dream",
} as const satisfies Track
