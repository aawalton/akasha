import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e10 = {
  id: "01a18852-d432-7609-8943-e334502ffdf6",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e10",
  description:
    'When Trip suffers a catastrophic injury, his only hope for survival is a transplant from a "mimetic symbiont" which Phlox grows from one of his exotic creatures.',
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 10,
  publishedAt: "2003-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15597",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/10",
    },
  ],
  title: "Similitude",
  episodeType: "standard",
  stillPath: "/4Q54bDCwtgiqBAZKHtecnvUNT2x.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
