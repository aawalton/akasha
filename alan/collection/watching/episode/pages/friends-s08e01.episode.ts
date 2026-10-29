import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS08e01 = {
  id: "01a18848-c2c3-773c-af6b-32e3aeb760c4",
  type: "page-type/episode",
  slug: "friends-s08e01",
  description:
    "The excitement of Monica and Chandler's wedding is diminished by the news that someone may be pregnant. Chandler's hopes of not embarrassing Monica on the dance floor are ruined by his slippery new shoes, and Ross' attempts to flirt with an attractive wedding guest.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-8"],
  position: 1,
  publishedAt: "2001-09-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87204",
      externalLink: "https://www.themoviedb.org/tv/1668/season/8/episode/1",
    },
  ],
  title: 'The One After "I Do"',
  episodeType: "standard",
  stillPath: "/zTVPfthOgP1yz9PcOxHRwPMEAUS.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
