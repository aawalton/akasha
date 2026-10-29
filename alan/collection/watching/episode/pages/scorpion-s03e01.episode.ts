import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS03e01 = {
  id: "01a1887f-56d5-74a8-8d31-5e1224f19b95",
  type: "page-type/episode",
  slug: "scorpion-s03e01",
  description:
    "The team members set aside their personal and romantic issues when hackers take over targeted U.S. military aircraft and war ships, pointing the weaponry at American cities.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/scorpion-season-3"],
  position: 1,
  publishedAt: "2016-10-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1222265",
      externalLink: "https://www.themoviedb.org/tv/60797/season/3/episode/1",
    },
  ],
  title: "Civil War",
  episodeType: "standard",
  stillPath: "/kV52OElXISWdpyOLi8Nxs8fnvVM.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
