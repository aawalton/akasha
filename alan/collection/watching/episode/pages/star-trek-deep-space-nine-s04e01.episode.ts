import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDeepSpaceNineS04e01 = {
  id: "01a18852-7714-7067-a7de-aaf29d6339a9",
  type: "page-type/episode",
  slug: "star-trek-deep-space-nine-s04e01",
  description:
    "Stardate: 49011.4.  When the Klingons bring a task force to DS9, Captain Sisko sends for Starfleet's lone Klingon officer, Worf, to uncover the mysterious intentions of their presence.",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-deep-space-nine-season-4"],
  position: 1,
  publishedAt: "1995-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005777",
      externalLink: "https://www.themoviedb.org/tv/580/season/4/episode/1",
    },
  ],
  title: "The Way of the Warrior",
  episodeType: "standard",
  stillPath: "/8vX58BH9QAmDytWwgDIdgy5QaiV.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:41:08.240Z",
  updatedAt: "2026-10-29T15:41:08.240Z",
} as const satisfies Episode
