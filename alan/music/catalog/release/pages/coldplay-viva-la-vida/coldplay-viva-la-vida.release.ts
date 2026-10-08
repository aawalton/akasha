import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayVivaLaVida = {
  id: "01a0676a-d730-7006-81dd-10822633be69",
  type: "page-type/release",
  slug: "coldplay-viva-la-vida",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2008-06-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2JJtOvxbxzUJsDVVyYZZPJ",
      externalLink: "https://open.spotify.com/album/2JJtOvxbxzUJsDVVyYZZPJ",
    },
  ],
  title: "Viva La Vida",
  createdAt: "2026-09-03T13:17:30.288Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
