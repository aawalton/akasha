import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e02 = {
  id: "01a18853-ac90-70ef-885d-84f10640ae54",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e02",
  description:
    'Stardate: 53049.2. The arrival of three mysterious "individuals" among an influx of visitors to Voyager has mysterious consequences for Seven, who must relive a Borg experience from eight years earlier.',
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 2,
  publishedAt: "1999-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113294",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/2",
    },
  ],
  title: "Survival Instinct",
  episodeType: "standard",
  stillPath: "/sfEAu09IMSCcfRTYuQQuY4afvxy.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
