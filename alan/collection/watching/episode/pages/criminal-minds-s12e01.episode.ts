import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS12e01 = {
  id: "01a18844-d7f5-7102-ab25-21285ad640bd",
  type: "page-type/episode",
  slug: "criminal-minds-s12e01",
  description:
    "Agent Luke Alvez (Adam Rodriguez) joins the BAU team, which is tasked with capturing a killer who escaped prison with 13 other convicts at the end of last season.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-12"],
  position: 1,
  publishedAt: "2016-09-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1219025",
      externalLink: "https://www.themoviedb.org/tv/4057/season/12/episode/1",
    },
  ],
  title: "The Crimson King",
  episodeType: "standard",
  stillPath: "/1dCWXEufSREWZ8tNNpbWIj4odsl.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
