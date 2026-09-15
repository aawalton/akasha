import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaLadyCroissantLivePictures = {
  id: "01a0a59c-0de6-7d94-bc57-ddbdc31c14ba",
  type: "page-type/track",
  slug: "sia-lady-croissant-live-pictures",
  ownLength: 3.6288833333333335,
  ownProgress: 0,
  partOfCollections: ["release/sia-lady-croissant-live"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1qsw4CHZCaF7TcPPLGg07O",
      externalLink: "https://open.spotify.com/track/1qsw4CHZCaF7TcPPLGg07O",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Pictures",
} as const satisfies Track
