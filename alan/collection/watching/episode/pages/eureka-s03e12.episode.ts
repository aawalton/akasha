import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS03e12 = {
  id: "01a18848-3732-7cb2-92ad-1b25b5d1545d",
  type: "page-type/episode",
  slug: "eureka-s03e12",
  description:
    "Carter finds himself chasing down creation of blob-ical like proportions when a series of escalating pranks turn deadly. Elsewhere, long-term rivals from Area 51 come to Eureka for a bowling tournament.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-3"],
  position: 12,
  publishedAt: "2009-07-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335263",
      externalLink: "https://www.themoviedb.org/tv/4620/season/3/episode/12",
    },
  ],
  title: "It's Not Easy Being Green",
  episodeType: "standard",
  stillPath: "/vOjeQf0Eb9IbKjafa7gUo4JZgRh.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
