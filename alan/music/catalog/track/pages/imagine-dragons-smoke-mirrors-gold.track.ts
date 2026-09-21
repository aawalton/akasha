import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsGold = {
  id: "01a0c43f-d25e-7043-a99a-f7853045afc8",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-gold",
  ownLength: 3.61355,
  ownProgress: 3.61355,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors"],
  position: 2,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1WQFOwtI6EfsvRz7wcDbQm",
      externalLink: "https://open.spotify.com/track/1WQFOwtI6EfsvRz7wcDbQm",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Gold",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "gold|53XhwfbYqKCa1cC15pYq2q|216813",
  song: "song/imagine-dragons-gold",
} as const satisfies Track
