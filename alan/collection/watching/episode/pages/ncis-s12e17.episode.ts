import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e17 = {
  id: "01a1884b-ef72-734f-81a2-9a09d26ccd28",
  type: "page-type/episode",
  slug: "ncis-s12e17",
  description:
    "Evidence in an NCIS murder case reveals a rare painting on loan had been swapped for a fake, prompting DiNozzo, Sr. to share his knowledge and contacts of the black market art world with the team.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 17,
  publishedAt: "2015-03-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1044324",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/17",
    },
  ],
  title: "The Artful Dodger",
  episodeType: "standard",
  stillPath: "/3G89i1SPe29wXIkgS2YI32QC7IY.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
