import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const daredevilS02e01 = {
  id: "01a18845-e1fa-7de7-807a-d494165b9331",
  type: "page-type/episode",
  slug: "daredevil-s02e01",
  description:
    "Daredevil is in hiding, but he isn't laying low. A shadowy player from Washington, D.C. emerges.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-daredevil-season-2"],
  position: 1,
  publishedAt: "2026-03-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6670286",
      externalLink: "https://www.themoviedb.org/tv/202555/season/2/episode/1",
    },
  ],
  title: "The Northern Star",
  episodeType: "standard",
  stillPath: "/hxZQi3iq4IC8K7EBd4ez2W0OQPO.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:27:23.641Z",
  updatedAt: "2026-10-29T15:27:23.641Z",
} as const satisfies Episode
