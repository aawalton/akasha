import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e18 = {
  id: "01a18852-d433-7603-a385-d84e8095a574",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e18",
  description:
    "Archer sets out on a suicide mission to destroy the Xindi superweapon as Enterprise faces a brutal attack.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 18,
  publishedAt: "2004-03-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15611",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/18",
    },
  ],
  title: "Azati Prime",
  episodeType: "standard",
  stillPath: "/86rduHGk3LV5PAWXvaGkWgdA1V9.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
