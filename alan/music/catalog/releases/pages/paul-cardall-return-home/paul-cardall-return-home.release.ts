import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const paulCardallReturnHome = {
  id: "01a0676a-d727-7071-be6b-55434119c11c",
  type: "release",
  slug: "paul-cardall-return-home",
  title: "Return Home",
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  ownLength: 50.622783,
  ownProgress: 50.622783,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-09-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Kn0CJ1PiNc15vCbYCIrmY",
      externalLink: "https://open.spotify.com/album/4Kn0CJ1PiNc15vCbYCIrmY",
    },
  ],
} as const satisfies Release
