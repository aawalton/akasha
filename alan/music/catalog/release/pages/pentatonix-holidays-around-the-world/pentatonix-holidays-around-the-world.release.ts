import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixHolidaysAroundTheWorld = {
  id: "01a0676a-d720-704e-aba0-d9acd6962f92",
  type: "page-type/release",
  slug: "pentatonix-holidays-around-the-world",
  title: "Holidays Around the World",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 40.9023,
  ownProgress: 40.902617,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-10-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "73NpyNEQHBYey6oZZrFD6X",
      externalLink: "https://open.spotify.com/album/73NpyNEQHBYey6oZZrFD6X",
    },
  ],
  createdAt: "2026-09-03T13:17:30.272Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Release
