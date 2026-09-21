import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiBetterPeopleToLeaveOnRead = {
  id: "01a0676a-d718-704e-af7a-1b120aed71f6",
  type: "page-type/release",
  slug: "emei-better-people-to-leave-on-read",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2022-01-26",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5jHDAAIvcOrvVKaq8CsU9A",
      externalLink: "https://open.spotify.com/album/5jHDAAIvcOrvVKaq8CsU9A",
    },
  ],
  title: "Better People To Leave On Read",
} as const satisfies Release
