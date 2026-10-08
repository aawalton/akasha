import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallReturnHome = {
  id: "01a0676a-d727-7071-be6b-55434119c11c",
  type: "page-type/release",
  slug: "paul-cardall-return-home",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2023-09-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Kn0CJ1PiNc15vCbYCIrmY",
      externalLink: "https://open.spotify.com/album/4Kn0CJ1PiNc15vCbYCIrmY",
    },
  ],
  title: "Return Home",
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
