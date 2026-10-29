import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS24e01 = {
  id: "01a1884b-ef86-7611-8e3b-d5356742e7af",
  type: "page-type/episode",
  slug: "ncis-s24e01",
  description:
    "While dealing with the fallout from the shooting involving McGee’s son, the team investigates a mysterious new threat to the Secretary of the Navy and receives help from an unexpected source: Tony DiNozzo, newly arrived in D.C. to open a satellite office of his private security firm.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-24"],
  position: 1,
  publishedAt: "2026-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7583542",
      externalLink: "https://www.themoviedb.org/tv/4614/season/24/episode/1",
    },
  ],
  title: "Wayward Son",
  episodeType: "standard",
  stillPath: "/xmIOHzKDxcAR6dM4HTWZUyGZMBo.jpg",
  voteAverage: 10,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
