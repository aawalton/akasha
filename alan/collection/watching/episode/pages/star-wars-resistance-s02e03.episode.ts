import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS02e03 = {
  id: "01a18853-f9b0-7ce9-ba1f-e29c9be78b02",
  type: "page-type/episode",
  slug: "star-wars-resistance-s02e03",
  description:
    "Kaz officially joins the Aces, as does Yeager -- who trains them to become better combat pilots. Tam learns what it's like to be a First Order pilot.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-2"],
  position: 3,
  publishedAt: "2019-10-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1945880",
      externalLink: "https://www.themoviedb.org/tv/79093/season/2/episode/3",
    },
  ],
  title: "Live Fire",
  episodeType: "standard",
  stillPath: "/bMOk0PNq74CQqDjKRqHVQI5EFJ0.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
