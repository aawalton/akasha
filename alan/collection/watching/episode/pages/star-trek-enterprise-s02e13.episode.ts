import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e13 = {
  id: "01a18852-d431-7f9a-9383-ad40ed73d228",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e13",
  description:
    "During a solo test mission on Shuttlepod One, Trip is attacked by a territorial alien and forced to land on the night side of a moon. As he tries contacting Enterprise, he discovers his alien foe has made an emergency landing nearby. The two contend with each other as an extremely hot sun rises and threatens both their lives.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 13,
  publishedAt: "2003-01-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15570",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/13",
    },
  ],
  title: "Dawn",
  episodeType: "standard",
  stillPath: "/1yUhTb1s6tZfPWDNpSnAAYxrB26.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
