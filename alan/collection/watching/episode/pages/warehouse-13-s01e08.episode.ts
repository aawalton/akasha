import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const warehouse13S01e08 = {
  id: "01a18859-886f-7506-b803-1049a875efd6",
  type: "page-type/episode",
  slug: "warehouse-13-s01e08",
  description:
    "Pete and Myka go to Las Vegas to fetch an artifact that is helping a couple of gamblers, but the mission goes awry when Myka becomes trapped in a famous author's mirror.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/warehouse-13-season-1"],
  position: 8,
  publishedAt: "2009-08-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "541569",
      externalLink: "https://www.themoviedb.org/tv/15819/season/1/episode/8",
    },
  ],
  title: "Duped",
  episodeType: "standard",
  stillPath: "/smhcAaVjyh1LUul1URbbSdovGXN.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:48:51.438Z",
  updatedAt: "2026-10-29T15:48:51.438Z",
} as const satisfies Episode
