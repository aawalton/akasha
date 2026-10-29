import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const downtonAbbeyS06e01 = {
  id: "01a18847-e987-7b8e-8e0d-f994c93277fb",
  type: "page-type/episode",
  slug: "downton-abbey-s06e01",
  description:
    "It is now 1925, when secrets and rifts threaten the unity of the family, while those below stairs are faced with social changes.",
  ownLength: 69,
  ownProgress: 0,
  partOfCollections: ["season/downton-abbey-season-6"],
  position: 1,
  publishedAt: "2015-09-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1102256",
      externalLink: "https://www.themoviedb.org/tv/33907/season/6/episode/1",
    },
  ],
  title: "Episode 1",
  episodeType: "standard",
  stillPath: "/rB4aVVy21mhXOybtma51IWlGJ2V.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:29:36.644Z",
  updatedAt: "2026-10-29T15:29:36.644Z",
} as const satisfies Episode
