import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraHoldOnLetGo = {
  id: "01a1690d-e324-7e48-ba03-55dbe68e505f",
  type: "page-type/release",
  slug: "aurora-hold-on-let-go",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2026-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0K4LTdHZ781XPfHINDrTN7",
      externalLink: "https://open.spotify.com/album/0K4LTdHZ781XPfHINDrTN7",
      lastSyncedAt: "2026-10-23",
    },
  ],
  title: "Hold On Let Go",
  createdAt: "2026-10-23T13:58:00.227Z",
  updatedAt: "2026-10-23T14:00:50.423Z",
} as const satisfies Release
