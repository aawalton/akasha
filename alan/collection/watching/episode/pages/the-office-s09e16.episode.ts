import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e16 = {
  id: "01a18857-c36f-7542-802b-7ddb73621a46",
  type: "page-type/episode",
  slug: "the-office-s09e16",
  description:
    "Pam interviews for a job in Philadelphia, but her potential manager reminds her of her former boss, Michael Scott. Dwight acquires the help of Angela in order to give his elderly Aunt Shirley a bath. Meanwhile, Andy attempts to make Pete and Erin feel uncomfortable.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 16,
  publishedAt: "2013-02-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170329",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/16",
    },
  ],
  title: "Moving On",
  episodeType: "standard",
  stillPath: "/az40PKIrPtgqAAxRpsxFwvkDMBh.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
