import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS04e03 = {
  id: "01a1885a-252d-74be-8d4f-d21421a3453f",
  type: "page-type/episode",
  slug: "young-sheldon-s04e03",
  description:
    "With college in sight, Sheldon is determined to ride his bike without training wheels. Also, Mary and George Sr. argue over parenting styles.",
  ownLength: 19,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-4"],
  position: 3,
  publishedAt: "2020-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2509702",
      externalLink: "https://www.themoviedb.org/tv/71728/season/4/episode/3",
    },
  ],
  title: "Training Wheels and an Unleashed Chicken",
  episodeType: "standard",
  stillPath: "/bLZr5UkwTbVclpRZdmxfLumDHQf.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
