import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS05e01 = {
  id: "01a1885a-252e-7735-90c5-d4dc733f6478",
  type: "page-type/episode",
  slug: "young-sheldon-s05e01",
  description:
    "Sheldon and Missy both run away from home, and Mary gets upsetting news about George Sr.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-5"],
  position: 1,
  publishedAt: "2021-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3070175",
      externalLink: "https://www.themoviedb.org/tv/71728/season/5/episode/1",
    },
  ],
  title: "One Bad Night and Chaos of Selfish Desires",
  episodeType: "standard",
  stillPath: "/gG5LaaxH0uZUWIZUWnKLNsNqmye.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
