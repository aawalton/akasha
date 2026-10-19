import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixIRise = {
  id: "01a0676a-d721-703b-833c-93f127e5630f",
  type: "page-type/release",
  slug: "pentatonix-i-rise",
  title: "I Rise",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-08-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2N3GoTPzZ81DIIujoxCYYP",
      externalLink: "https://open.spotify.com/album/2N3GoTPzZ81DIIujoxCYYP",
    },
  ],
  createdAt: "2026-09-03T13:17:30.273Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
