import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS02e05 = {
  id: "01a18885-00f9-7e03-bfff-283bee9063dd",
  type: "page-type/episode",
  slug: "studio-c-s02e05",
  description:
    "Three doctors try a new treatment method, a young lawyer has his first experience in court, and Mr. Eckelstone teaches scouts the dangers of wilderness survival.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-2"],
  position: 5,
  publishedAt: "2013-04-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1383570",
      externalLink: "https://www.themoviedb.org/tv/68207/season/2/episode/5",
    },
  ],
  title: "Season 2 Episode 5",
  episodeType: "standard",
  stillPath: "/gdrB7p0LXQZN1NXhJDTXDabbo5P.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
