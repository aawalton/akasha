import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS12e11 = {
  id: "01a1884a-e0f5-7ff1-8155-64d1dba4ef34",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s12e11",
  description:
    "When Callen goes to the National Counterterrorism Center on the pretext of interrogating a Russian asset from the crashed plane case he investigated months earlier, the tables are turned and he is detained, accused of being a Russian agent.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-12"],
  position: 11,
  publishedAt: "2021-02-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2615619",
      externalLink: "https://www.themoviedb.org/tv/17610/season/12/episode/11",
    },
  ],
  title: "Russia, Russia, Russia",
  episodeType: "standard",
  stillPath: "/vd6iG64aTtfkG33MbvEx8ti53KP.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
