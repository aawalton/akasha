import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e05 = {
  id: "01a18853-ac8f-7b5b-bb0c-4bf02ecade36",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e05",
  description:
    "Stardate: Unknown. While Voyager searches for the crew of the crashed Delta Flyer carrying Tuvok, Paris and Ensign Wildman, Neelix must keep Naomi occupied. When it is discovered that Samantha is badly injured, he must decide how much he should tell her daughter.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 5,
  publishedAt: "1998-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113208",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/5",
    },
  ],
  title: "Once Upon a Time",
  episodeType: "standard",
  stillPath: "/nfCaqEEHAogk8ZeBYBfDolqxLj6.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
