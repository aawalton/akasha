import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS03e10 = {
  id: "01a18857-c367-7433-9c05-e2957985806e",
  type: "page-type/episode",
  slug: "the-office-s03e10",
  description:
    "Michael was in the holiday spirit and couldn't wait to share in it with his girlfriend, Carol. He had bought two tickets to paradise, hoping to whisk her away on a romantic vacation to Jamaica. Carol came by the office early to have a talk with Michael and it didn't go well.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-3"],
  position: 10,
  publishedAt: "2006-12-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170167",
      externalLink: "https://www.themoviedb.org/tv/2316/season/3/episode/10",
    },
  ],
  title: "A Benihana Christmas",
  episodeType: "mid-season",
  stillPath: "/z9n8oabMUlhjlsGzU90cYtgYOza.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
