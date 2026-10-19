import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixTheSoundOfSilence = {
  id: "01a0676a-d72e-700f-83fc-e0a3f8421d21",
  type: "page-type/release",
  slug: "pentatonix-the-sound-of-silence",
  title: "The Sound of Silence",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-02-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2d5CHsmyOYGqfjDaPrdEzc",
      externalLink: "https://open.spotify.com/album/2d5CHsmyOYGqfjDaPrdEzc",
    },
  ],
  createdAt: "2026-09-03T13:17:30.286Z",
  updatedAt: "2026-10-19T14:01:29.522Z",
  progressedAt: "2026-10-19T14:01:29.522Z",
} as const satisfies Release
