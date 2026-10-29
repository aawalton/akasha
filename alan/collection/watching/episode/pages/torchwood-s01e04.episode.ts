import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS01e04 = {
  id: "01a18859-3c68-74fd-afa0-6c50dd28fbed",
  type: "page-type/episode",
  slug: "torchwood-s01e04",
  description:
    'A Ianto themed episode\n\nIanto Jones hides a very big secret at Torchwood - his half-converted girlfriend from the Canary Wharf Battle - down in the basement. He is quick to hire a Japanese doctor who believes he can "cure" her. But things soon go wrong, and the Cyberwoman\'s destructive powers are released to the whole of Torchwood. Upgrading is compulsary.',
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/torchwood-season-1"],
  position: 4,
  publishedAt: "2006-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21571",
      externalLink: "https://www.themoviedb.org/tv/424/season/1/episode/4",
    },
  ],
  title: "Cyberwoman",
  episodeType: "standard",
  stillPath: "/xvbRrX7qa8yH63YDGktHjo3EVhp.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
