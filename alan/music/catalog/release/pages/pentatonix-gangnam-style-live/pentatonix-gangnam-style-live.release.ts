import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixGangnamStyleLive = {
  id: "01a0676a-d71e-704d-ba8d-69d3d915c104",
  type: "page-type/release",
  slug: "pentatonix-gangnam-style-live",
  title: "Gangnam Style (Live)",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2012-07-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3H3pn3fWzek2YkRHGl50xP",
      externalLink: "https://open.spotify.com/album/3H3pn3fWzek2YkRHGl50xP",
    },
  ],
  createdAt: "2026-09-03T13:17:30.270Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
