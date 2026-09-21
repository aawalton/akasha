import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsLoomGodsDontPray = {
  id: "01a0c43f-b517-7f56-a630-cc20454196e7",
  type: "page-type/track",
  slug: "imagine-dragons-loom-gods-dont-pray",
  ownLength: 2.83155,
  ownProgress: 2.83155,
  partOfCollections: ["release/imagine-dragons-loom"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1QO4QjFDpibHdYoOlTGH6x",
      externalLink: "https://open.spotify.com/track/1QO4QjFDpibHdYoOlTGH6x",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Gods Don’t Pray",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "godsdontpray|53XhwfbYqKCa1cC15pYq2q|169893",
  song: "song/imagine-dragons-gods-don-t-pray",
  carriedBy: [
    {
      release: "release/imagine-dragons-loom",
      discNumber: 1,
      position: 6,
      externalId: "1QO4QjFDpibHdYoOlTGH6x",
      externalLink: "https://open.spotify.com/track/1QO4QjFDpibHdYoOlTGH6x",
    },
  ],
} as const satisfies Track
