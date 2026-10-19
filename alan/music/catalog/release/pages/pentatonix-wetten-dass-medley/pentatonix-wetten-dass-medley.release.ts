import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixWettenDassMedley = {
  id: "01a0676a-d730-703e-8b79-67ba79b6f7e1",
  type: "page-type/release",
  slug: "pentatonix-wetten-dass-medley",
  title: '"Wetten, dass..?" Medley',
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-12-18",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2KKMaBL8SBqWqRehaTn6YC",
      externalLink: "https://open.spotify.com/album/2KKMaBL8SBqWqRehaTn6YC",
    },
  ],
  createdAt: "2026-09-03T13:17:30.288Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
