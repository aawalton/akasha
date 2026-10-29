import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS04e10 = {
  id: "01a18844-610f-7a63-821c-7415ab6490f1",
  type: "page-type/episode",
  slug: "clone-wars-s04e10",
  description:
    "With two of his men facing execution for disobeying orders, Captain Rex must confront his overly aggressive commander, General Krell. Risking charges of mutiny, Rex must make a dark choice as the true face of the enemy emerges.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/clone-wars-season-4"],
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
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
