import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS08e08 = {
  id: "01a18885-00fe-7301-983e-e5f201c9b63a",
  type: "page-type/episode",
  slug: "studio-c-s08e08",
  description:
    "It's Studio C's 100th episode! Dalton takes his TSA job a little too seriously, Matt can't stop reading Tori's texts, and Jeremy ends up sharing a row with a bloodsucking passenger.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/studio-c-season-8"],
  position: 8,
  publishedAt: "2017-11-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1387479",
      externalLink: "https://www.themoviedb.org/tv/68207/season/8/episode/8",
    },
  ],
  title: "Season 8 Episode 8",
  episodeType: "standard",
  stillPath: "/hNlNJ49lbs8PzJwYOyVvymqwhJ1.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
