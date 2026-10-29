import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e26 = {
  id: "01a18852-d432-70c9-b3e4-cf3f3620af78",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e26",
  description:
    "An alien race known as the Xindi launch an attack on Earth, causing great casualties and massive damage. As Enterprise heads back home, an unlikely source informs Archer about the Xindi and that their next attack will destroy Earth.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 26,
  publishedAt: "2003-05-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15580",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/26",
    },
  ],
  title: "The Expanse",
  episodeType: "finale",
  stillPath: "/gqzHpV5j2feUj8Z3Wlume3iMvYs.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
