import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e13 = {
  id: "01a18852-d430-7a92-8f25-b8249993d924",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e13",
  description:
    "The crew discovers a new planet with two races, one in desperate need of medical and scientific assistance. In the course of trying to help, Dr. Phlox recalls his own Denobulan past to address the ethical dilemmas that arise in the present.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 13,
  publishedAt: "2002-01-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15548",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/13",
    },
  ],
  title: "Dear Doctor",
  episodeType: "standard",
  stillPath: "/uZMUn0LsIkNHTc57Im9YYBQUgJX.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
