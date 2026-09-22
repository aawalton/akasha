import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxTraitorToMyself = {
  id: "01a0c95d-faa6-78d9-87fb-91746248618d",
  type: "page-type/release",
  slug: "lilith-max-traitor-to-myself",
  ownLength: 3.303516666666667,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2026-07-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1tDsbASDOcfJGlehrKuoVM",
      externalLink: "https://open.spotify.com/album/1tDsbASDOcfJGlehrKuoVM",
      lastSyncedAt: "2026-09-22",
    },
  ],
  title: "Traitor To Myself",
} as const satisfies Release
