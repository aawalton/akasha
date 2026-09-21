import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2BallroomOfRomance = {
  id: "01a0676a-d718-7012-8172-b02b26654652",
  type: "page-type/release",
  slug: "celtic-woman-2-ballroom-of-romance",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2019-08-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6cmsz9QejTIg39cN6tpwfc",
      externalLink: "https://open.spotify.com/album/6cmsz9QejTIg39cN6tpwfc",
    },
  ],
  title: "Ballroom Of Romance",
} as const satisfies Release
