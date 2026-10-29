import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e20 = {
  id: "01a18852-d434-749b-8ec4-bfc9ec892025",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e20",
  description:
    "A xenophobic faction of humanity threatens to undermine talks to form a new coalition of planets.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 20,
  publishedAt: "2005-05-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15616",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/20",
    },
  ],
  title: "Demons (1)",
  episodeType: "standard",
  stillPath: "/rJkkG79rK6JqujJjhFpi94pR921.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
