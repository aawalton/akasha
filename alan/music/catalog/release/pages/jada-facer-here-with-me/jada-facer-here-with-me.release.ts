import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerHereWithMe = {
  id: "01a0676a-d720-7031-b278-9f7f67933c53",
  type: "page-type/release",
  slug: "jada-facer-here-with-me",
  title: "Here With Me",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.633917,
  ownProgress: 2.633917,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-07-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5bJqQlM1imaljnrGdApIrC",
      externalLink: "https://open.spotify.com/album/5bJqQlM1imaljnrGdApIrC",
    },
  ],
} as const satisfies Release
