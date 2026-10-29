import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ruriRocksS01e01 = {
  id: "01a18851-972f-7764-b4b3-6aa696286b6d",
  type: "page-type/episode",
  slug: "ruri-rocks-s01e01",
  description:
    "High school girl Ruri meets graduate student Nagi while collecting minerals in the mountains.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/ruri-rocks-season-1"],
  position: 1,
  publishedAt: "2025-07-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5603383",
      externalLink: "https://www.themoviedb.org/tv/271649/season/1/episode/1",
    },
  ],
  title: "My First Mineral Hunt",
  episodeType: "standard",
  stillPath: "/v3LFiaw3ZQVrEWIW7mgFi3lhr0m.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:40:10.927Z",
  updatedAt: "2026-10-29T15:40:10.927Z",
} as const satisfies Episode
