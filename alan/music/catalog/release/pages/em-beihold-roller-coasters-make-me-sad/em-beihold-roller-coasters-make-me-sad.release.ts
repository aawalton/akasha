import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdRollerCoastersMakeMeSad = {
  id: "01a0676a-d728-701a-a0c5-d1a413f247db",
  type: "page-type/release",
  slug: "em-beihold-roller-coasters-make-me-sad",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  publishedAt: "2023-02-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "16M3QY0xlHJ1CtnmEwbiy1",
      externalLink: "https://open.spotify.com/album/16M3QY0xlHJ1CtnmEwbiy1",
    },
  ],
  title: "Roller Coasters Make Me Sad",
} as const satisfies Release
