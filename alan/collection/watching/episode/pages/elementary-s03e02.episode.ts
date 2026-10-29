import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS03e02 = {
  id: "01a1887e-62a8-7dfb-96fa-90514f5208be",
  type: "page-type/episode",
  slug: "elementary-s03e02",
  description:
    "When Sherlock and Joan join forces on a double homicide, Sherlock’s new apprentice threatens the investigation when she allows her jealousy of Sherlock and Joan's work rapport to override her better judgment.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-3"],
  position: 2,
  publishedAt: "2014-11-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1012009",
      externalLink: "https://www.themoviedb.org/tv/1415/season/3/episode/2",
    },
  ],
  title: "The Five Orange Pipz",
  episodeType: "standard",
  stillPath: "/cCiMIJpewZjPJFJFXkdQfAi7XKz.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
