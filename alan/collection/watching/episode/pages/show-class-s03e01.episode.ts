import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const showClassS03e01 = {
  id: "01a18851-e165-7c8e-90c2-9e40bed42701",
  type: "page-type/episode",
  slug: "show-class-s03e01",
  description:
    "Degrassi is giving a warm welcome to an influx of Syrian refugees and a spiteful Lola posts a controversial photo.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/show-class-season-3"],
  position: 1,
  publishedAt: "2017-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1249752",
      externalLink: "https://www.themoviedb.org/tv/65152/season/3/episode/1",
    },
  ],
  title: "#BreakTheInternet",
  episodeType: "standard",
  stillPath: "/3ACXpvZ8eJyBnNysEobuKW6czJ.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:29.924Z",
  updatedAt: "2026-10-29T15:40:29.924Z",
} as const satisfies Episode
