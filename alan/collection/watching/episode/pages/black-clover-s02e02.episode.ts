import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackCloverS02e02 = {
  id: "01a183da-1967-7a57-839b-ee47c5f62e29",
  type: "page-type/episode",
  slug: "black-clover-s02e02",
  description:
    "Mereoleona takes on the ancient demon and the Magic Knights rush to stop the Door to Hell from opening.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/black-clover-season-2"],
  position: 2,
  publishedAt: "2026-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7903429",
      externalLink: "https://www.themoviedb.org/tv/73223/season/2/episode/2",
    },
  ],
  title: "The Door to Hell",
  episodeType: "standard",
  stillPath: "/vWPi2ABa2gVxEvhJBye6NwU5plQ.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:51:11.067Z",
  updatedAt: "2026-10-28T18:51:11.067Z",
} as const satisfies Episode
