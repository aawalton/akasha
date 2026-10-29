import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sherlockS03e02 = {
  id: "01a1887f-adf0-7025-bf22-5017ae0903d9",
  type: "page-type/episode",
  slug: "sherlock-s03e02",
  description:
    "Sherlock faces his biggest challenge of all – delivering a Best Man’s speech on John’s wedding day! But all isn’t quite as it seems. Mortal danger stalks the reception – and someone might not make it to the happy couple’s first dance. Sherlock must thank the bridesmaids, solve the case and stop a killer. ",
  ownLength: 87,
  ownProgress: 87,
  partOfCollections: ["season/sherlock-season-3"],
  position: 2,
  publishedAt: "2014-01-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "578722",
      externalLink: "https://www.themoviedb.org/tv/19885/season/3/episode/2",
    },
  ],
  title: "The Sign of Three",
  episodeType: "standard",
  stillPath: "/ca3ayuzXGpxpALFlcsVsXTQau9G.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:30:31.407Z",
  updatedAt: "2026-10-29T16:30:31.407Z",
} as const satisfies Episode
