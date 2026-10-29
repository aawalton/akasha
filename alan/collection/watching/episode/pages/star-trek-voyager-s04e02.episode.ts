import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e02 = {
  id: "01a18853-ac8d-7644-a903-ff98841f1695",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e02",
  description:
    "Stardate: 51008. Janeway begins the process of integrating Seven of Nine into the Voyager crew. Meanwhile, Kes begins to experience extreme advances in her mental powers.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 2,
  publishedAt: "1997-09-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113159",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/2",
    },
  ],
  title: "The Gift",
  episodeType: "standard",
  stillPath: "/429sc0FVK0hpnmiZ9Ww28wFueY0.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
