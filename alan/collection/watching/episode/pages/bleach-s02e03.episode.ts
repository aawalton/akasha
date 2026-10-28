import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS02e03 = {
  id: "01a183d3-f482-767d-aa69-b3b97c75ab22",
  type: "page-type/episode",
  slug: "bleach-s02e03",
  description:
    "Ichigo and his friends arrive in Hueco Mundo to confront Quilge Opie and learn that their latest enemy are Quincies.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-2"],
  position: 3,
  publishedAt: "2022-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3997307",
      externalLink: "https://www.themoviedb.org/tv/30984/season/2/episode/3",
    },
  ],
  title: "March of the Starcross",
  episodeType: "standard",
  stillPath: "/5dkbh523J6viGq3XHncr122dcRj.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
