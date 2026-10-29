import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS03e01 = {
  id: "01a18844-610d-74b4-a964-46c6e3d19ac2",
  type: "page-type/episode",
  slug: "clone-wars-s03e01",
  description:
    'Five headstrong clones struggle to complete their training on Kamino. These cadets -- Hevy, Cutup, Droidbait, Fives and Echo -- seem to be a "bad batch" and are unable to work as a team. As Shaak Ti and drill instructors Bric and El-Les debate the cadets\' fate, the clones learn to work together and accept their destiny as soldiers.',
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-clone-wars-season-3"],
  position: 1,
  publishedAt: "2010-09-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286631",
      externalLink: "https://www.themoviedb.org/tv/4194/season/3/episode/1",
    },
  ],
  title: "Clone Cadets",
  episodeType: "standard",
  stillPath: "/928tL9muL1c6ckMXaDRQLMmQFd7.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
