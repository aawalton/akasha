import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS04e09 = {
  id: "01a18857-c369-71dc-9ec7-ed513256ec8c",
  type: "page-type/episode",
  slug: "the-office-s04e09",
  description:
    "Michael stages an elaborate plan to finally get Pam and Jim over to his and Jan's place for a dinner party. Jim gets trapped into it and agrees to go. Dwight overhears and wants his invitation, too. Michael says he only has six wine glasses and with Andy and Angela going too, there's not enough room for Dwight.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-4"],
  position: 9,
  publishedAt: "2008-04-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170241",
      externalLink: "https://www.themoviedb.org/tv/2316/season/4/episode/9",
    },
  ],
  title: "Dinner Party",
  episodeType: "standard",
  stillPath: "/57v9TNarlMz9pf6ZStEmt7jpYMM.jpg",
  voteAverage: 9,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
