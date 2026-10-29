import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e14 = {
  id: "01a18857-c36e-791e-9810-4a2e20799c4e",
  type: "page-type/episode",
  slug: "the-office-s08e14",
  description:
    "Dwight scores a special assignment at Sabre's Florida headquarters. As a result, he and Andy must decide which Scranton staffers will join him. Elsewhere, Pam returns from maternity leave.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 14,
  publishedAt: "2012-02-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170300",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/14",
    },
  ],
  title: "Special Project",
  episodeType: "standard",
  stillPath: "/81kHQLh0DUrJVlUINyX7cqmfSr5.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
