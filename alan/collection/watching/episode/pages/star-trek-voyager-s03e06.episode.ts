import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e06 = {
  id: "01a18853-ac8c-7272-a732-f18ba94b15c0",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e06",
  description:
    "Stardate: 50203.1. After Voyager encounter a telepathic species, B'Elanna starts having powerful dreams that depict the life of a woman and her lover in a time of great political and social upheaval.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 6,
  publishedAt: "1996-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113103",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/6",
    },
  ],
  title: "Remember",
  episodeType: "standard",
  stillPath: "/pVgKZqXv2KuUXgucidc85qHpfBD.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
