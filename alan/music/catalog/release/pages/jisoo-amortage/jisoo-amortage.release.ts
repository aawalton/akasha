import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jisooAmortage = {
  id: "01a0676a-d717-700e-97e1-25c52ba10744",
  type: "page-type/release",
  slug: "jisoo-amortage",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jisoo"],
  position: 0,
  publishedAt: "2025-02-14",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1hmW4opQGq4hIYTbEWsyqW",
      externalLink: "https://open.spotify.com/album/1hmW4opQGq4hIYTbEWsyqW",
      lastSyncedAt: "2025-11-24",
    },
  ],
  title: "AMORTAGE",
} as const satisfies Release
