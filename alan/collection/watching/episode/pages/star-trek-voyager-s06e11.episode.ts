import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e11 = {
  id: "01a18853-ac91-7957-aaf7-a89416d1b12c",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e11",
  description:
    "Stardate: Unknown. As the crew enjoys time off in a holo-program created by Tom Paris, and set in an Irish village named 'Fair Haven,' Captain Janeway falls for a handsome holo-character specifically designed for her. A deadly neutrino wave approaching Voyager shortly bring the festivities to a halt as this wave may prove to be more dangerous than they first imagined.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 11,
  publishedAt: "2000-01-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113314",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/11",
    },
  ],
  title: "Fair Haven",
  episodeType: "standard",
  stillPath: "/nu6m67lcYF4cK8NNJRjjqSVgpFk.jpg",
  voteAverage: 5.6,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
