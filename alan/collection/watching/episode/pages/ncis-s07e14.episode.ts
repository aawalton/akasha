import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e14 = {
  id: "01a1884b-ef6a-7733-a89f-2a0d4a6f9e08",
  type: "page-type/episode",
  slug: "ncis-s07e14",
  description:
    'The team finds themselves in a race against time when a terrorist group threatens to detonate a "dirty bomb" in the D.C. area.',
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 14,
  publishedAt: "2010-02-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334553",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/14",
    },
  ],
  title: "Masquerade",
  episodeType: "standard",
  stillPath: "/viPSI8JNhLXF7Iupd9rBeAHpnyR.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
