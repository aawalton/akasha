import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS06e24 = {
  id: "01a1884a-e0ef-77b5-a04a-9a5e59326aef",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s06e24",
  description:
    "Some of the team have to assume undercover identities in Moscow so that they can locate their suspects.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-6"],
  position: 24,
  publishedAt: "2015-05-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1058184",
      externalLink: "https://www.themoviedb.org/tv/17610/season/6/episode/24",
    },
  ],
  title: "Chernoff, K.",
  episodeType: "finale",
  stillPath: "/rxRuPax5Ure0YSTyhNlg0s9zZHw.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
