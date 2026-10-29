import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e20 = {
  id: "01a18853-ac8c-79a9-a201-b3690155a46c",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e20",
  description:
    "Stardate: 50732.4. Harry Kim experiences strong senses of deja vu in an unknown region of space. He soon learns that he is native to this region and that he is T'Karian, not human.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 20,
  publishedAt: "1997-03-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113140",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/20",
    },
  ],
  title: "Favorite Son",
  episodeType: "standard",
  stillPath: "/exCu36rrsvl1pDGmaqXCHXCcY6W.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
