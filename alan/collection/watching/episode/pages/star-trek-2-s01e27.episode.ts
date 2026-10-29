import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e27 = {
  id: "01a1887f-e187-74c0-92f2-1a5bb60983bd",
  type: "page-type/episode",
  slug: "star-trek-2-s01e27",
  description:
    "Kirk and Spock encounter an alien named Lazarus who claims to be from an anti-matter universe.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-1"],
  position: 27,
  publishedAt: "1967-03-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13979",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/27",
    },
  ],
  title: "The Alternative Factor",
  episodeType: "standard",
  stillPath: "/l6Oe1nrrkiJCuSRcEXexD78MtaV.jpg",
  voteAverage: 5.7,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
