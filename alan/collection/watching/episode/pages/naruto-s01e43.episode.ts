import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e43 = {
  id: "01a183d1-bb4d-79a2-9cc6-77d86a267811",
  type: "page-type/episode",
  slug: "naruto-s01e43",
  description:
    "Temari of the Sand Village battles against Tenten from the Leaf Village. After the battle its Shikamaru's turn, but can he defeat an opponent who has already seen his moves once before?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 43,
  publishedAt: "2003-07-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1145023",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/43",
    },
  ],
  title: "Killer Kunoichi and a Shaky Shikamaru",
  episodeType: "standard",
  stillPath: "/cfyppAV2k3JNOk2w3OSNpy3iXSd.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
