import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const showClassS03e04 = {
  id: "01a18851-e166-7271-b568-2e2ed685da42",
  type: "page-type/episode",
  slug: "show-class-s03e04",
  description:
    "Maya meets Saad, who shares a mutual interest in the dark side. Frankie feels that Jonah is hiding something.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/show-class-season-3"],
  position: 4,
  publishedAt: "2017-01-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1249755",
      externalLink: "https://www.themoviedb.org/tv/65152/season/3/episode/4",
    },
  ],
  title: "#PicsOrItDidntHappen",
  episodeType: "standard",
  stillPath: "/gM497HMJsbrDmnr8TOMS9z9eZkh.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:29.924Z",
  updatedAt: "2026-10-29T15:40:29.924Z",
} as const satisfies Episode
