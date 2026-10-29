import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS03e03 = {
  id: "01a18852-196a-780a-a5de-d45bef5f4ba8",
  type: "page-type/episode",
  slug: "skeleton-crew-s03e03",
  description:
    "Everyone has a story to tell as MoneyShot$ hosts the release party for Glenn's autobiography. Plans are derailed, however, when Anthony and Hunter discover a surprise on the floor of the bar.",
  ownLength: 37,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-3"],
  position: 3,
  publishedAt: "2017-12-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380473",
      externalLink: "https://www.themoviedb.org/tv/225011/season/3/episode/3",
    },
  ],
  title: "Rhys",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
