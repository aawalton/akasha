import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e07 = {
  id: "01a18853-ac8d-7626-bf84-3e28231d5cb2",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e07",
  description:
    "Stardate: 51244.3. When members of the crew begin suffering from bizarre mutations, Seven of Nine may be the only one who can uncover the reasons why.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 7,
  publishedAt: "1997-10-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113165",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/7",
    },
  ],
  title: "Scientific Method",
  episodeType: "standard",
  stillPath: "/k26MEwlVphnWHNfYubxJkfxds2i.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
