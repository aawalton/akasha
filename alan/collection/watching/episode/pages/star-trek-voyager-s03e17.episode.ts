import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e17 = {
  id: "01a18853-ac8c-744d-bd95-d9df9fba362d",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e17",
  description:
    "Stardate: 50614.2. During an away mission, Chakotay discovers a Federation hailing signature coming from an alien planet. After landing, he learns that all is not peaceful, and those helping him have not been entirely honest about their true origins.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 17,
  publishedAt: "1997-02-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113133",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/17",
    },
  ],
  title: "Unity",
  episodeType: "standard",
  stillPath: "/yjNlnNaLOsEyc6G0T61Z6ogMnEq.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
