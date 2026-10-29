import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS02e01 = {
  id: "01a1885a-252b-7ee8-8fb7-fb64da23bd97",
  type: "page-type/episode",
  slug: "young-sheldon-s02e01",
  description:
    "After Sheldon dismantles the refrigerator to stop an annoying hum, he gets a paper route to pay for the repairs.",
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-2"],
  position: 1,
  publishedAt: "2018-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1556974",
      externalLink: "https://www.themoviedb.org/tv/71728/season/2/episode/1",
    },
  ],
  title: "A High-Pitched Buzz and Training Wheels",
  episodeType: "standard",
  stillPath: "/wO0Y0sGuBrAyacU7EBk4zk6oaU1.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
