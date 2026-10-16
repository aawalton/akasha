import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSherlockS01e03 = {
  id: "01a1447e-0757-73bb-86f5-ba03da55e6bf",
  type: "page-type/episode",
  slug: "young-sherlock-s01e03",
  description:
    "The game's afoot. With another murder and two professors missing, it's a race against time for Sherlock and Moriarty to find them before the killer does.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/young-sherlock-season-1"],
  position: 3,
  publishedAt: "2026-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5657754",
      externalLink: "https://www.themoviedb.org/tv/255661/season/1/episode/3",
    },
  ],
  title: "The Case of the Unarmed Man",
  episodeType: "standard",
  stillPath: "/uGV7r8hH3bRPfN8NO37ROw0KIfC.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-16T11:34:32.535Z",
  updatedAt: "2026-10-16T11:34:32.535Z",
} as const satisfies Episode
