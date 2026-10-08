import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiRegrets = {
  id: "01a0676a-d727-7061-af04-ced7663cd0c4",
  type: "page-type/release",
  slug: "emei-regrets",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2022-09-28",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2JNxwslDi54vHpSMofYiNR",
      externalLink: "https://open.spotify.com/album/2JNxwslDi54vHpSMofYiNR",
    },
  ],
  title: "Regrets",
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
