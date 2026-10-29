import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS06e05 = {
  id: "01a1887e-1e42-73e4-a633-be5e9ac8ec44",
  type: "page-type/episode",
  slug: "castle-s06e05",
  description:
    "A grisly murder investigation leads Castle and Beckett to a suspect who claims he's traveled back in time to stop terrible events from unfolding, events that will change the course of human history. Is he simply a deluded killer, or is it possible that he's telling the truth?",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/castle-season-6"],
  position: 5,
  publishedAt: "2013-10-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "967996",
      externalLink: "https://www.themoviedb.org/tv/1419/season/6/episode/5",
    },
  ],
  title: "Time Will Tell",
  episodeType: "standard",
  stillPath: "/nb2OFzHvuQhMAaomCGaUo6wExwI.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
