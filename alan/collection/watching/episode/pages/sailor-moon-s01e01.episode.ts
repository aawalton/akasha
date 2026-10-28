import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sailorMoonS01e01 = {
  id: "01a183d8-488e-7c2f-9dc1-a0d92bdbc55f",
  type: "page-type/episode",
  slug: "sailor-moon-s01e01",
  description:
    "Usagi Tsukino is a 14-year-old schoolgirl who is very cheerful, but clumsy and is always finding herself into unwanted trouble. One day, Usagi meets a talking black cat named Luna, who reveals that dark forces are threatening the lives of the innocent and that Usagi has the power to stop them. Using a magical brooch, Usagi is transformed into Sailor Moon, the chosen guardian who fights for love and justice.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/sailor-moon-season-1"],
  position: 1,
  publishedAt: "1992-03-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "992277",
      externalLink: "https://www.themoviedb.org/tv/3570/season/1/episode/1",
    },
  ],
  title: "A Moon Star Is Born",
  episodeType: "standard",
  stillPath: "/cYmli9KoGBgKmTgcZbGAaRbXUox.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Episode
