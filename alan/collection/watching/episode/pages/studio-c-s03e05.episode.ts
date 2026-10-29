import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS03e05 = {
  id: "01a18885-00fa-77d7-912f-f4450d6afdfa",
  type: "page-type/episode",
  slug: "studio-c-s03e05",
  description:
    "Joe Dangerfield hosts an animal show for kids demonstrating how to take caution with animals.",
  ownLength: 26,
  ownProgress: 26,
  partOfCollections: ["season/studio-c-season-3"],
  position: 5,
  publishedAt: "2013-11-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5580140",
      externalLink: "https://www.themoviedb.org/tv/68207/season/3/episode/5",
    },
  ],
  title: "Season 3 Episode 5",
  episodeType: "standard",
  stillPath: "/pVedOw7d05jf8rW3TYqKCw57Z8.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
