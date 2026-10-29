import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sherlockS04e01 = {
  id: "01a1887f-adf0-793f-89b8-3419bc164134",
  type: "page-type/episode",
  slug: "sherlock-s04e01",
  description:
    "Why is someone destroying images of Margaret Thatcher? Is there a madman on the loose? Or is there a much darker purpose at work?",
  ownLength: 89,
  ownProgress: 89,
  partOfCollections: ["season/sherlock-season-4"],
  position: 1,
  publishedAt: "2017-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1234465",
      externalLink: "https://www.themoviedb.org/tv/19885/season/4/episode/1",
    },
  ],
  title: "The Six Thatchers",
  episodeType: "standard",
  stillPath: "/pGRnT0D3Ni2QJzmcRyX3HZVcWrE.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:30:31.407Z",
  updatedAt: "2026-10-29T16:30:31.407Z",
} as const satisfies Episode
