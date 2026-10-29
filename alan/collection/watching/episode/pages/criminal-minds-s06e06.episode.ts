import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS06e06 = {
  id: "01a18844-d7ec-75fc-a150-abc08aad69ef",
  type: "page-type/episode",
  slug: "criminal-minds-s06e06",
  description:
    "The team searches for a killer who has struck the past three years during Detroit's raucous pre-Halloween celebrations.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-6"],
  position: 6,
  publishedAt: "2010-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283306",
      externalLink: "https://www.themoviedb.org/tv/4057/season/6/episode/6",
    },
  ],
  title: "Devil's Night",
  episodeType: "standard",
  stillPath: "/3igpG2Z85KaU2m7NZrkTG2m6z2M.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
