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
  rank: "B",
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
} as const satisfies Release
