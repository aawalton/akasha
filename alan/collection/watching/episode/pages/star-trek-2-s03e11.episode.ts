import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e11 = {
  id: "01a1887f-e18a-7734-9e68-f65cca6b96cb",
  type: "page-type/episode",
  slug: "star-trek-2-s03e11",
  description:
    'Invisible "time-accelerated" aliens take over the Enterprise and attempt to abduct the crew for use as "genetic stock".',
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 11,
  publishedAt: "1968-11-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14022",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/11",
    },
  ],
  title: "Wink of an Eye",
  episodeType: "standard",
  stillPath: "/dN6EYZ9MixIwfYMJ2Lr3k0nKTsS.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
