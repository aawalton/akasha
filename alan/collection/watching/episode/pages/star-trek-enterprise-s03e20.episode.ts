import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e20 = {
  id: "01a18852-d433-7a17-a5ad-ec7792000036",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e20",
  description:
    "Two high-ranking Xindi offer to stop the launch of their superweapon if Archer can prove they've been manipulated. Meanwhile, the crew mourns their lost mates.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 20,
  publishedAt: "2004-04-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15592",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/20",
    },
  ],
  title: "The Forgotten",
  episodeType: "standard",
  stillPath: "/7vdMSKIxfIPYps5lhuuPhapoQ4Q.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
