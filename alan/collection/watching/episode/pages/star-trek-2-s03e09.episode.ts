import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e09 = {
  id: "01a1887f-e18a-7b3e-95fe-e9ef053639c8",
  type: "page-type/episode",
  slug: "star-trek-2-s03e09",
  description:
    "Captain Kirk is caught between dimensions while the crew of the Enterprise works to retrieve him. All the while, the Tholians demand that the Enterprise leave their space.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-3"],
  position: 9,
  publishedAt: "1968-11-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14018",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/9",
    },
  ],
  title: "The Tholian Web",
  episodeType: "standard",
  stillPath: "/xum58j5tN5umIOnTyJMTSlzS7K8.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
