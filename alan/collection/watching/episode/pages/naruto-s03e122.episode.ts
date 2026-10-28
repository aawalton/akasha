import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS03e122 = {
  id: "01a183d1-bb53-7fd3-9dfc-bc7e3e96cdf2",
  type: "page-type/episode",
  slug: "naruto-s03e122",
  description:
    "Shikamaru's got his hands full with Tayuya and her melodic attacks. Can he stop her and put an end to her malevolent flute playing?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-3"],
  position: 122,
  publishedAt: "2005-02-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908099",
      externalLink: "https://www.themoviedb.org/tv/46260/season/3/episode/122",
    },
  ],
  title: "Fakeout: Shikamaru's Comeback!",
  episodeType: "standard",
  stillPath: "/cBEgDZ27aTWlNXAaBIG0RQYlLUf.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
