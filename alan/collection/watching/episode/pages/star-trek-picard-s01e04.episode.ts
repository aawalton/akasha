import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS01e04 = {
  id: "01a18853-07cd-73b0-99a5-3536c9403b44",
  type: "page-type/episode",
  slug: "star-trek-picard-s01e04",
  description:
    "The crew's journey to Freecloud takes a detour when Picard orders a stop at the planet Vashti, where Picard and Raffi relocated Romulan refugees fourteen years earlier. Upon arrival, Picard reunites with Elnor, a young Romulan he befriended during the relocation. Meanwhile, Narek continues his attempts to learn more about Soji while Narissa's impatience with his lack of progress grows.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-1"],
  position: 4,
  publishedAt: "2020-02-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2057378",
      externalLink: "https://www.themoviedb.org/tv/85949/season/1/episode/4",
    },
  ],
  title: "Absolute Candor",
  episodeType: "standard",
  stillPath: "/55nXz9SuIbBHNPkWq9wyeqMAxI4.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
