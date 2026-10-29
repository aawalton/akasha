import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e01 = {
  id: "01a1884b-ef64-76aa-a330-bc1312c63ab1",
  type: "page-type/episode",
  slug: "ncis-s03e01",
  description:
    "After the terrorist's attack, the NCIS team are shocked and are trying to cope with Kate's sudden death, each in their own way. Now, their mission is to collect all the possible info on Ari and find a way to stop him before he does any more damage.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 1,
  publishedAt: "2005-09-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334541",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/1",
    },
  ],
  title: "Kill Ari (1)",
  episodeType: "standard",
  stillPath: "/qxQUJtawHa8WJxX7IWGaDtfULh.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
