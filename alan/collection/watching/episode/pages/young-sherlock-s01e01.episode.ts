import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSherlockS01e01 = {
  id: "01a1447e-0757-75a6-bbd0-7f06d31d851e",
  type: "page-type/episode",
  slug: "young-sherlock-s01e01",
  completedAt: "2026-10-13",
  description:
    "1871. A wayward young Sherlock Holmes is sent to Oxford to keep out of trouble, but he soon finds himself the prime suspect in a police investigation that threatens his entire future.",
  ownLength: 54,
  ownProgress: 54,
  partOfCollections: ["season/young-sherlock-season-1"],
  position: 1,
  publishedAt: "2026-03-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5379729",
      externalLink: "https://www.themoviedb.org/tv/255661/season/1/episode/1",
    },
  ],
  title: "The Case of the Missing Scrolls",
  episodeType: "standard",
  stillPath: "/zilQxwuXqt7UOE6whgWyh5vHYY5.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-16T11:34:32.535Z",
  updatedAt: "2026-10-16T11:34:32.535Z",
} as const satisfies Episode
