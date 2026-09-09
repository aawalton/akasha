import type { Artist } from "../../artist.page-type.ts"

export const justinTimberlake = {
  id: "01a06803-676b-701d-ad52-5efd0f3dbe08",
  pageTypeSlug: "artist",
  type: "artist",
  slug: "justin-timberlake",
  title: "Justin Timberlake",
  partOfCollections: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "archived",
  rank: "D",
  externalId: "31TPClRtHm23RisEBtV3X7",
  externalLink: "https://open.spotify.com/artist/31TPClRtHm23RisEBtV3X7",
  lastSyncedAt: "2025-09-30",
  tags: ["Boy Bands"],
} as const satisfies Artist
