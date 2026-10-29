import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS04e01 = {
  id: "01a1887e-62aa-7758-bea4-7cfb04531201",
  type: "page-type/episode",
  slug: "elementary-s04e01",
  description:
    "When Holmes faces criminal charges in the aftermath of his recent violent behavior and relapse, his powerful father arrives in New York to fix his estranged son’s legal difficulties by any means necessary. Also, with Holmes and Watson’s consultancy with the NYPD in jeopardy, Holmes concentrates on the case of a missing wife believed to have been killed by her husband to try and get back in the department’s good graces.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-4"],
  position: 1,
  publishedAt: "2015-11-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1096474",
      externalLink: "https://www.themoviedb.org/tv/1415/season/4/episode/1",
    },
  ],
  title: "The Past is Parent",
  episodeType: "standard",
  stillPath: "/bC942nKynEXAhGQhce3vcjNjgQA.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
