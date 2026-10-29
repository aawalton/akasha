import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e19 = {
  id: "01a18853-ac91-7dc1-98a3-f7e707f18e85",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e19",
  description:
    "Stardate: Unknown. Seven's feelings and maternal instincts are awakened when the crew locates the parents of one of the Borg children to whom Seven has grown attached.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 19,
  publishedAt: "2000-03-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113353",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/19",
    },
  ],
  title: "Child's Play",
  episodeType: "standard",
  stillPath: "/bdigMIyyRzFfztTrgpkYxZovn65.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
