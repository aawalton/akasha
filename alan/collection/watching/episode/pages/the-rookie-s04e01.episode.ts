import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theRookieS04e01 = {
  id: "01a18885-4804-7e5d-9bb2-6172bcd62e05",
  type: "page-type/episode",
  slug: "the-rookie-s04e01",
  description:
    "Officer Nolan and the entire team race against the clock to locate Lopez after she is kidnapped on her wedding day, not only to save her life but her unborn child’s.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-rookie-season-4"],
  position: 1,
  publishedAt: "2021-09-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3076772",
      externalLink: "https://www.themoviedb.org/tv/79744/season/4/episode/1",
    },
  ],
  title: "Life and Death",
  episodeType: "standard",
  stillPath: "/nFqC1BbFBeBjaddV0OgiVxIendJ.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T16:36:38.529Z",
  updatedAt: "2026-10-29T16:36:38.529Z",
} as const satisfies Episode
