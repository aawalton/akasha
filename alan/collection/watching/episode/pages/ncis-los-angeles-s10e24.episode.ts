import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS10e24 = {
  id: "01a1884a-e0f4-76c5-b979-d50b63c0b60a",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s10e24",
  description:
    'Callen and Sam work with Navy Captain Harmon "Harm" Rabb, Jr. (David James Elliott) to locate a group of ISIS sympathizers aboard the USS Allegiance. Also, Hetty enlists her friend, Lieutenant Colonel Sarah "Mac". Mackenzie (Catherine Bell), to help obtain information from a Russian diplomat.',
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-10"],
  position: 24,
  publishedAt: "2019-05-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773924",
      externalLink: "https://www.themoviedb.org/tv/17610/season/10/episode/24",
    },
  ],
  title: "False Flag",
  episodeType: "finale",
  stillPath: "/daWCbly7HHBM5OOFjvnQ6tPUkwX.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
