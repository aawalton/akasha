import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS04e10 = {
  id: "01a18854-50ab-7329-b86d-e776f562c9f7",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s04e10",
  description:
    "With two of his men facing execution for disobeying orders, Captain Rex must confront his overly aggressive commander, General Krell. Risking charges of mutiny, Rex must make a dark choice as the true face of the enemy emerges.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-4"],
  position: 10,
  publishedAt: "2011-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286675",
      externalLink: "https://www.themoviedb.org/tv/4194/season/4/episode/10",
    },
  ],
  title: "Carnage of Krell",
  episodeType: "standard",
  stillPath: "/evtxKCS09L50TUVVy3o2mfWOXdb.jpg",
  voteAverage: 9.1,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
