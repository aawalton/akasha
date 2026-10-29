import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const helstromS01e01 = {
  id: "01a18849-6db8-76e2-8697-04934ce37f37",
  type: "page-type/episode",
  slug: "helstrom-s01e01",
  description:
    "Daimon Helstrom investigates a possessed young boy in Oregon. Meanwhile in San Francisco, Ana Helstrom stages an auction to expose a criminal. Disturbing events at St. Teresa’s cause concern as the siblings estranged Mother remains hospitalized.",
  ownLength: 56,
  ownProgress: 0,
  partOfCollections: ["season/helstrom-season-1"],
  position: 1,
  publishedAt: "2020-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2363795",
      externalLink: "https://www.themoviedb.org/tv/88987/season/1/episode/1",
    },
  ],
  title: "Mother’s Little Helpers",
  episodeType: "standard",
  stillPath: "/fGFuSOOkkhM0XdVFm2ZT20k45Qg.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:31:16.024Z",
  updatedAt: "2026-10-29T15:31:16.024Z",
} as const satisfies Episode
