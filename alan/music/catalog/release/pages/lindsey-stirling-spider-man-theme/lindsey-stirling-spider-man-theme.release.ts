import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lindseyStirlingSpiderManTheme = {
  id: "01a0a587-c4a2-724d-bf86-151ed1ddbd88",
  type: "page-type/release",
  slug: "lindsey-stirling-spider-man-theme",
  ownLength: 4.142533333333334,
  ownProgress: 0,
  partOfCollections: ["artist/lindsey-stirling"],
  position: 0,
  publishedAt: "2016-09-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5y3PtiaPdfHADUTyqIqJ7p",
      externalLink: "https://open.spotify.com/album/5y3PtiaPdfHADUTyqIqJ7p",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Spider-Man Theme",
} as const satisfies Release
