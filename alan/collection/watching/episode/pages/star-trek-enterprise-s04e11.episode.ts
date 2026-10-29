import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e11 = {
  id: "01a18852-d434-7bae-bef1-2af583060424",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e11",
  description:
    "Non corporeal aliens study the Enterprise crew as they respond to a fatal viral infection brought on board from an away mission.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 11,
  publishedAt: "2005-01-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15623",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/11",
    },
  ],
  title: "Observer Effect",
  episodeType: "standard",
  stillPath: "/1wlvbseo5oZwgjAk8zdt6MOw5ee.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
