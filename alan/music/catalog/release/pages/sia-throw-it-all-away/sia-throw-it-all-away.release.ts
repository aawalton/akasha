import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaThrowItAllAway = {
  id: "01a0676a-d72e-7039-962c-686dcc9489f1",
  type: "page-type/release",
  slug: "sia-throw-it-all-away",
  title: "Throw It All Away",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2006-04-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0KjafXlMpv87ZpMrxv8qrE",
      externalLink: "https://open.spotify.com/album/0KjafXlMpv87ZpMrxv8qrE",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.286Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
