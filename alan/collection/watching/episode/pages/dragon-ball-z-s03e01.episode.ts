import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallZS03e01 = {
  id: "01a183dc-5615-7c90-bffc-c8206019ee2d",
  type: "page-type/episode",
  slug: "dragon-ball-z-s03e01",
  description:
    "Having acquired all seven Namekian Dragon Balls, Krillin and Gohan are ready to summon the dragon and make their wish. There’s just one problem: they don’t know the password!",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-z-season-3"],
  position: 1,
  publishedAt: "1991-01-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "969655",
      externalLink: "https://www.themoviedb.org/tv/12971/season/3/episode/1",
    },
  ],
  title: "Password Is Porunga",
  episodeType: "standard",
  stillPath: "/k3VhNv3xhgRzKxcrIi0PTCh6hQL.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-28T18:53:37.679Z",
  updatedAt: "2026-10-28T18:53:37.679Z",
} as const satisfies Episode
