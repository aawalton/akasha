import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsShots = {
  id: "01a0c43f-d236-70c6-a80f-2bc4d98f8df4",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-shots",
  ownLength: 3.8722166666666666,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "64MmobYNviePoiaINMrbMn",
      externalLink: "https://open.spotify.com/track/64MmobYNviePoiaINMrbMn",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Shots",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "shots|53XhwfbYqKCa1cC15pYq2q|232333",
  song: "song/imagine-dragons-shots",
} as const satisfies Track
