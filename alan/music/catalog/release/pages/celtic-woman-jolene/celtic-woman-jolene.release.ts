import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWomanJolene = {
  id: "01a19794-d20f-7dcb-b179-e8ab1651eb2b",
  type: "page-type/release",
  slug: "celtic-woman-jolene",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2026-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4rQuWmKs2cfLzbL9PnWprh",
      externalLink: "https://open.spotify.com/album/4rQuWmKs2cfLzbL9PnWprh",
      lastSyncedAt: "2026-11-01",
    },
  ],
  title: "Jolene",
  createdAt: "2026-11-01T14:47:55.150Z",
  updatedAt: "2026-11-01T15:00:42.655Z",
} as const satisfies Release
