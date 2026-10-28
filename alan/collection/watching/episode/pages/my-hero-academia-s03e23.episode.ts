import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS03e23 = {
  id: "01a183d4-acc5-751f-982a-2915d459db25",
  type: "page-type/episode",
  slug: "my-hero-academia-s03e23",
  description:
    "Following the provisional licensing exam, Izuku tries out his Shoot Style on Bakugo as they have a heart-to-heart through their fight.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-3"],
  position: 23,
  publishedAt: "2018-09-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1567027",
      externalLink: "https://www.themoviedb.org/tv/65930/season/3/episode/23",
    },
  ],
  title: "Deku vs. Kacchan, Part 2",
  episodeType: "standard",
  stillPath: "/9aWqAYr03K5LG5oa3bOrX6qOmP7.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
