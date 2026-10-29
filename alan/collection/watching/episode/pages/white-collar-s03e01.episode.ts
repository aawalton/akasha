import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS03e01 = {
  id: "01a18881-51a1-7e08-beb2-ccdd98cf0318",
  type: "page-type/episode",
  slug: "white-collar-s03e01",
  description:
    "Despite their newly-arisen trust issues, Neal and Peter have to work together to catch a thief who took his stash out of the Federal Reserve.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/white-collar-season-3"],
  position: 1,
  publishedAt: "2011-06-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596275",
      externalLink: "https://www.themoviedb.org/tv/21510/season/3/episode/1",
    },
  ],
  title: "On Guard",
  episodeType: "standard",
  stillPath: "/neTPmfloLPE5eQoSRh6S4C21gcP.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
