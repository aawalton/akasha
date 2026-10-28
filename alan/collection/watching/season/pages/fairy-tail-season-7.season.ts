import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const fairyTailSeason7 = {
  id: "01a183d7-2660-788e-8353-e756e5bbfa66",
  type: "page-type/season",
  slug: "fairy-tail-season-7",
  description:
    'The first 10 episodes are an adaptation of the spin-off manga series "Fairy Tail Zero" by Hiro Mashima. "Fairy Tail Zero" is a prequel which focuses on the adventures of the guild\'s first master, Mavis Vermillion. The last 2 episodes adapt material from the last two chapters of the 49th volume of the original manga, and deal with Lucy Heartfilia reuniting with Natsu Dragneel and Happy at the Grand Magic Games.',
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/fairy-tail"],
  position: 7,
  publishedAt: "2016-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "72166",
      externalLink: "https://www.themoviedb.org/tv/46261/season/7",
    },
  ],
  title: "FAIRY TAIL ZERØ",
  posterPath: "/dorzFzD65utfD39pEu7PbcXmEFH.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-28T18:47:57.774Z",
  updatedAt: "2026-10-28T18:47:57.774Z",
} as const satisfies Season
