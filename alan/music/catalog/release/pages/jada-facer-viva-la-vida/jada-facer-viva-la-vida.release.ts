import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerVivaLaVida = {
  id: "01a0676a-d730-7007-b55c-358e865661f3",
  type: "page-type/release",
  slug: "jada-facer-viva-la-vida",
  title: "Viva La Vida",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 3.998067,
  ownProgress: 3.998067,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-05-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ss3fRbqHRDgqQY5zVkC1z",
      externalLink: "https://open.spotify.com/album/2ss3fRbqHRDgqQY5zVkC1z",
    },
  ],
  createdAt: "2026-09-03T13:17:30.288Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
