import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS05e12 = {
  id: "01a18854-50ad-7423-9866-db755bf3c425",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s05e12",
  description:
    "In a nearly vacant town, R2-D2 and his team find a clone commando suffering from amnesia.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-5"],
  position: 12,
  publishedAt: "2013-01-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010373",
      externalLink: "https://www.themoviedb.org/tv/4194/season/5/episode/12",
    },
  ],
  title: "Missing in Action",
  episodeType: "standard",
  stillPath: "/7jlyC4IVw239wLJ8qjG35Voa5vR.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
