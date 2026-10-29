import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS03e03 = {
  id: "01a1884b-3018-7893-9759-353cf44c5702",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s03e03",
  description:
    "After a decorated Petty Officer is found dead inside a sports arena, evidence leads Pride and the NCIS team to a kidnapping case of a Petty Officer who was last seen in Mexico.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-3"],
  position: 3,
  publishedAt: "2016-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1224211",
      externalLink: "https://www.themoviedb.org/tv/61387/season/3/episode/3",
    },
  ],
  title: "Man on Fire",
  episodeType: "standard",
  stillPath: "/s6oLDzXHjEFGcsQsSLvCwyUQaJm.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
