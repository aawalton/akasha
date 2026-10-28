import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS03e118 = {
  id: "01a183d1-bb53-743c-8cae-4c1c5697bf46",
  type: "page-type/episode",
  slug: "naruto-s03e118",
  description:
    "In pursuit of the Sound Ninja, Naruto, Kiba and Shikamaru strike at dawn to retrieve Sasuke and bring him back to the Hidden Leaf Village.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-3"],
  position: 118,
  publishedAt: "2005-01-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908095",
      externalLink: "https://www.themoviedb.org/tv/46260/season/3/episode/118",
    },
  ],
  title: "The Vessel Arrives Too Late",
  episodeType: "standard",
  stillPath: "/bbnuYF2EAZ2CW4dwVYCzhI6U1c4.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
