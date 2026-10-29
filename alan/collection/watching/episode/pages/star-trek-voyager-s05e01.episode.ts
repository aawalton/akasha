import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e01 = {
  id: "01a18853-ac8e-742a-8bff-634aabc929c8",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e01",
  description:
    "Stardate: 52081.2. Traveling through a large area of space completely devoid of stars and civilizations, the Voyager crew copes with the prospect of long-term isolation.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 1,
  publishedAt: "1998-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113198",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/1",
    },
  ],
  title: "Night",
  episodeType: "standard",
  stillPath: "/w1OltQYJumrHb3a5EnERC7Fwip.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
