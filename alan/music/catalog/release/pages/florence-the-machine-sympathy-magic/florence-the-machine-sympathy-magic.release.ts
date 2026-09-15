import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineSympathyMagic = {
  id: "01a0676a-d72b-7009-a7de-6f5255d4a0b9",
  type: "page-type/release",
  slug: "florence-the-machine-sympathy-magic",
  title: "Sympathy Magic",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 4.481433,
  ownProgress: 4.481433,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-10-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "420amymxJxkmBkTr5ceDYU",
      externalLink: "https://open.spotify.com/album/420amymxJxkmBkTr5ceDYU",
      lastSyncedAt: "2026-02-14",
    },
  ],
} as const satisfies Release
