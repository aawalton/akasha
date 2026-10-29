import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e04 = {
  id: "01a18853-ac8c-788d-a373-45b81e000121",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e04",
  description:
    "Stardate: 50252.3. Voyager must cross through the territory of a mysterious and fiercely isolationist species.  Meanwhile, B’Ellana tries to help the Doctor when he begins losing his memory.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 4,
  publishedAt: "1996-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113090",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/4",
    },
  ],
  title: "The Swarm",
  episodeType: "standard",
  stillPath: "/tlzph6RrL2DzmIiIisJigTROhaq.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
