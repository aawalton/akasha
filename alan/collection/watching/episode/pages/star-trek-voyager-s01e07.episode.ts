import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS01e07 = {
  id: "01a18853-ac89-7953-89fd-c66e650a1718",
  type: "page-type/episode",
  slug: "star-trek-voyager-s01e07",
  description:
    "Stardate: Unknown. Tom Paris is accused of a murder he claims he did not commit. His sentence is to re-live the last few moments of his victim's life every 14 hours through a memory transplant.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-1"],
  position: 7,
  publishedAt: "1995-02-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112913",
      externalLink: "https://www.themoviedb.org/tv/1855/season/1/episode/7",
    },
  ],
  title: "Ex Post Facto",
  episodeType: "standard",
  stillPath: "/d6UuOw5RbEvtFbivWaABiTZErwz.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
