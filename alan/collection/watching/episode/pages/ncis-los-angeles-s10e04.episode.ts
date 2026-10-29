import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS10e04 = {
  id: "01a1884a-e0f3-7017-a12b-25bd8f019558",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s10e04",
  description:
    "The NCIS team is in danger after their pictures, as well as Mosley and her son’s names, are included on a cartel hit list. Also, NCIS Deputy Director Louis Ochoa arrives with Special Prosecutor John Rogers to interview Mosley about the off-the-books mission in Mexico.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-10"],
  position: 4,
  publishedAt: "2018-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1598876",
      externalLink: "https://www.themoviedb.org/tv/17610/season/10/episode/4",
    },
  ],
  title: "Hit List",
  episodeType: "standard",
  stillPath: "/gfWmdzei2ElQKoigtyGli63U74h.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
