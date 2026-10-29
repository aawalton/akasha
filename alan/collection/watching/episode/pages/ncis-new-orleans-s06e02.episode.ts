import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS06e02 = {
  id: "01a1884b-301d-76c3-8fe7-7602d0ffb054",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s06e02",
  description:
    "NCIS investigates a private plane crash after a Navy pilot says she saw an unidentified object prior to the crash. Pride suffers from insomnia and nightmares as a result of being kidnapped and drugged last year.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-6"],
  position: 2,
  publishedAt: "2019-10-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1932408",
      externalLink: "https://www.themoviedb.org/tv/61387/season/6/episode/2",
    },
  ],
  title: "The Terminator Conundrum",
  episodeType: "standard",
  stillPath: "/xvZzSoRZDJPec6QJdcHG7mImyoL.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
